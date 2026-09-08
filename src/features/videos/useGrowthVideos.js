import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'

export { filterVideosByPath } from './filterVideosByPath'

async function fetchVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('sequence_order', { ascending: true })

  if (error) throw error
  return data
}

async function fetchVideoProgress(userId) {
  const { data, error } = await supabase.from('user_video_progress').select('*').eq('user_id', userId)

  if (error) throw error
  return data
}

// Fetches the video catalog and the current user's watch progress, and
// joins them into a single list, each video annotated with `watched`.
export function useGrowthVideos() {
  const { user } = useAuth()

  const videosQuery = useQuery({ queryKey: ['videos'], queryFn: fetchVideos })
  const progressQuery = useQuery({
    queryKey: ['video-progress', user?.id],
    queryFn: () => fetchVideoProgress(user.id),
    enabled: !!user,
  })

  const isLoading = videosQuery.isLoading || progressQuery.isLoading
  const isError = videosQuery.isError || progressQuery.isError

  const data = useMemo(() => {
    if (!videosQuery.data || !progressQuery.data) return undefined

    const watchedIds = new Set(
      progressQuery.data.filter((row) => row.watched).map((row) => row.video_id),
    )

    return videosQuery.data.map((video) => ({ ...video, watched: watchedIds.has(video.id) }))
  }, [videosQuery.data, progressQuery.data])

  return { data, isLoading, isError }
}
