export interface Memory {
  id: string
  birthday_id: string
  user_id: string
  image_path: string
  caption: string | null
  memory_date: string | null
  created_at: string
  updated_at: string
}

export interface MemoryWithUrl extends Memory {
  imageUrl: string
}