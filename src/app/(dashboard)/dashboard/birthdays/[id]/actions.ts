'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { deleteStorageObject, BUCKET } from '@/lib/supabase/storage'

export type MediaActionResult = { success: true; path?: string } | { success: false; error: string }
export type MemoryActionResult = { success: true; id?: string } | { success: false; error: string }

async function requireUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

function extFromFile(file: File) {
  const parts = file.name.split('.')
  return parts.length > 1 ? parts.pop() : 'jpg'
}

// --- Profile picture ---

export async function uploadProfilePicture(birthdayId: string, formData: FormData): Promise<MediaActionResult> {
  const { supabase, user } = await requireUser()
  if (!user) return { success: false, error: 'You must be logged in.' }

  const file = formData.get('file') as File | null
  if (!file || file.size === 0) return { success: false, error: 'No file provided.' }
  if (!file.type.startsWith('image/')) return { success: false, error: 'File must be an image.' }
  if (file.size > 5 * 1024 * 1024) return { success: false, error: 'Image must be under 5MB.' }

  const { data: existing } = await supabase
    .from('birthdays')
    .select('profile_picture_path')
    .eq('id', birthdayId)
    .eq('user_id', user.id)
    .single()

  const path = `${user.id}/${birthdayId}/profile-${Date.now()}.${extFromFile(file)}`

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  })
  if (uploadError) return { success: false, error: uploadError.message }

  const { error: updateError } = await supabase
    .from('birthdays')
    .update({ profile_picture_path: path })
    .eq('id', birthdayId)
    .eq('user_id', user.id)

  if (updateError) {
    await deleteStorageObject(path)
    return { success: false, error: updateError.message }
  }

  if (existing?.profile_picture_path) {
    await deleteStorageObject(existing.profile_picture_path)
  }

  revalidatePath(`/dashboard/birthdays/${birthdayId}`)
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/birthdays')
  return { success: true, path }
}

export async function deleteProfilePicture(birthdayId: string): Promise<MediaActionResult> {
  const { supabase, user } = await requireUser()
  if (!user) return { success: false, error: 'You must be logged in.' }

  const { data: existing, error: fetchError } = await supabase
    .from('birthdays')
    .select('profile_picture_path')
    .eq('id', birthdayId)
    .eq('user_id', user.id)
    .single()

  if (fetchError) return { success: false, error: fetchError.message }
  if (!existing?.profile_picture_path) return { success: true }

  const { error: updateError } = await supabase
    .from('birthdays')
    .update({ profile_picture_path: null })
    .eq('id', birthdayId)
    .eq('user_id', user.id)

  if (updateError) return { success: false, error: updateError.message }

  await deleteStorageObject(existing.profile_picture_path)

  revalidatePath(`/dashboard/birthdays/${birthdayId}`)
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/birthdays')
  return { success: true }
}

// --- Memories ---

export async function addMemory(birthdayId: string, formData: FormData): Promise<MemoryActionResult> {
  const { supabase, user } = await requireUser()
  if (!user) return { success: false, error: 'You must be logged in.' }

  const file = formData.get('file') as File | null
  const caption = (formData.get('caption') as string)?.trim() || null
  const memoryDate = (formData.get('memory_date') as string) || null

  if (!file || file.size === 0) return { success: false, error: 'Please choose a photo.' }
  if (!file.type.startsWith('image/')) return { success: false, error: 'File must be an image.' }
  if (file.size > 5 * 1024 * 1024) return { success: false, error: 'Image must be under 5MB.' }

  const { data: birthday, error: birthdayError } = await supabase
    .from('birthdays')
    .select('id')
    .eq('id', birthdayId)
    .eq('user_id', user.id)
    .single()

  if (birthdayError || !birthday) return { success: false, error: 'Birthday not found.' }

  const { data: inserted, error: insertError } = await supabase
    .from('memories')
    .insert({ birthday_id: birthdayId, user_id: user.id, image_path: '', caption, memory_date: memoryDate })
    .select('id')
    .single()

  if (insertError || !inserted) return { success: false, error: insertError?.message ?? 'Could not create memory.' }

  const path = `${user.id}/${birthdayId}/memories/${inserted.id}.${extFromFile(file)}`

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  })

  if (uploadError) {
    await supabase.from('memories').delete().eq('id', inserted.id)
    return { success: false, error: uploadError.message }
  }

  const { error: pathUpdateError } = await supabase.from('memories').update({ image_path: path }).eq('id', inserted.id)

  if (pathUpdateError) {
    await deleteStorageObject(path)
    await supabase.from('memories').delete().eq('id', inserted.id)
    return { success: false, error: pathUpdateError.message }
  }

  revalidatePath(`/dashboard/birthdays/${birthdayId}`)
  return { success: true, id: inserted.id }
}

export async function updateMemory(memoryId: string, formData: FormData): Promise<MemoryActionResult> {
  const { supabase, user } = await requireUser()
  if (!user) return { success: false, error: 'You must be logged in.' }

  const caption = (formData.get('caption') as string)?.trim() || null
  const memoryDate = (formData.get('memory_date') as string) || null
  const file = formData.get('file') as File | null

  const { data: existing, error: fetchError } = await supabase
    .from('memories')
    .select('id, birthday_id, image_path')
    .eq('id', memoryId)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !existing) return { success: false, error: 'Memory not found.' }

  let newPath: string | null = null

  if (file && file.size > 0) {
    if (!file.type.startsWith('image/')) return { success: false, error: 'File must be an image.' }
    if (file.size > 5 * 1024 * 1024) return { success: false, error: 'Image must be under 5MB.' }

    newPath = `${user.id}/${existing.birthday_id}/memories/${memoryId}-${Date.now()}.${extFromFile(file)}`
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(newPath, file, {
      contentType: file.type,
      upsert: false,
    })
    if (uploadError) return { success: false, error: uploadError.message }
  }

  const { error: updateError } = await supabase
    .from('memories')
    .update({ caption, memory_date: memoryDate, ...(newPath ? { image_path: newPath } : {}) })
    .eq('id', memoryId)
    .eq('user_id', user.id)

  if (updateError) {
    if (newPath) await deleteStorageObject(newPath)
    return { success: false, error: updateError.message }
  }

  if (newPath && existing.image_path) {
    await deleteStorageObject(existing.image_path)
  }

  revalidatePath(`/dashboard/birthdays/${existing.birthday_id}`)
  return { success: true }
}

export async function deleteMemory(memoryId: string): Promise<MemoryActionResult> {
  const { supabase, user } = await requireUser()
  if (!user) return { success: false, error: 'You must be logged in.' }

  const { data: existing, error: fetchError } = await supabase
    .from('memories')
    .select('id, birthday_id, image_path')
    .eq('id', memoryId)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !existing) return { success: false, error: 'Memory not found.' }

  const { error: deleteError } = await supabase.from('memories').delete().eq('id', memoryId).eq('user_id', user.id)
  if (deleteError) return { success: false, error: deleteError.message }

  await deleteStorageObject(existing.image_path)

  revalidatePath(`/dashboard/birthdays/${existing.birthday_id}`)
  return { success: true }
}