'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type ActionResult =
  | { success: true; id?: string }
  | { success: false; error: string }

export async function addBirthday(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'You must be logged in.' }

  const name = (formData.get('name') as string)?.trim()
  const birthday = formData.get('birthday') as string
  const birthYearRaw = formData.get('birth_year') as string
  const category = (formData.get('category') as string) || 'All'
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!name || !birthday) {
    return { success: false, error: 'Name and birthday are required.' }
  }

  const birth_year = birthYearRaw ? parseInt(birthYearRaw, 10) : null

  const { data, error } = await supabase
    .from('birthdays')
    .insert({ user_id: user.id, name, birthday, birth_year, category, notes })
    .select('id')
    .single()

  if (error) return { success: false, error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/birthdays')
  return { success: true, id: data.id }
}

export async function updateBirthday(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'You must be logged in.' }

  const name = (formData.get('name') as string)?.trim()
  const birthday = formData.get('birthday') as string
  const birthYearRaw = formData.get('birth_year') as string
  const category = (formData.get('category') as string) || 'All'
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!name || !birthday) {
    return { success: false, error: 'Name and birthday are required.' }
  }

  const birth_year = birthYearRaw ? parseInt(birthYearRaw, 10) : null

  const { error } = await supabase
    .from('birthdays')
    .update({ name, birthday, birth_year, category, notes })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/birthdays')
  revalidatePath(`/dashboard/birthdays/${id}`)
  return { success: true }
}

export async function deleteBirthday(id: string): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'You must be logged in.' }

  const { error } = await supabase.from('birthdays').delete().eq('id', id).eq('user_id', user.id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/birthdays')
  return { success: true }
}