// lib/supabase-upload.ts
import { supabase } from './supabase'

export async function uploadFileToSupabase(file: File) {
  const filePath = `${Date.now()}_${file.name}`
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  // Get public URL
  const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(filePath)
  return publicUrlData.publicUrl
}