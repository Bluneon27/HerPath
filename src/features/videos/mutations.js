import { supabase } from '@/lib/supabase'

export async function markVideoWatched({ userId, videoId }) {
  const { data, error } = await supabase
    .from('user_video_progress')
    .upsert(
      { user_id: userId, video_id: videoId, watched: true, watched_at: new Date().toISOString() },
      { onConflict: 'user_id,video_id' },
    )
    .select()
    .single()

  if (error) throw error
  return data
}

export async function markVideoUnwatched({ userId, videoId }) {
  const { data, error } = await supabase
    .from('user_video_progress')
    .upsert(
      { user_id: userId, video_id: videoId, watched: false, watched_at: null },
      { onConflict: 'user_id,video_id' },
    )
    .select()
    .single()

  if (error) throw error
  return data
}
