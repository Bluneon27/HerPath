import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Browser } from '@capacitor/browser'
import { useAuth } from '@/features/auth/AuthProvider'
import { useGrowthAssessment } from '@/features/assessment/useGrowthAssessment'
import { useGrowthVideos, filterVideosByPath } from './useGrowthVideos'
import { markVideoWatched, markVideoUnwatched } from './mutations'
import { VideoCard } from './VideoCard'
import { GROWTH_PATH_NAMES } from '@/lib/growthPaths'
import { cn } from '@/lib/utils'

export function VideosSection() {
  const { user } = useAuth()
  const assessmentQuery = useGrowthAssessment()
  const videosQuery = useGrowthVideos()
  const queryClient = useQueryClient()
  const [selectedPath, setSelectedPath] = useState(null)

  const paths = useMemo(() => {
    if (!assessmentQuery.data) return []
    return [
      assessmentQuery.data.primary_growth_path,
      assessmentQuery.data.secondary_growth_path_1,
      assessmentQuery.data.secondary_growth_path_2,
    ].filter(Boolean)
  }, [assessmentQuery.data])

  const activePath = selectedPath ?? paths[0]

  const filteredVideos = useMemo(() => {
    if (!videosQuery.data || !activePath) return []
    return filterVideosByPath(videosQuery.data, activePath)
  }, [videosQuery.data, activePath])

  const invalidateProgress = () =>
    queryClient.invalidateQueries({ queryKey: ['video-progress', user.id] })

  const watchMutation = useMutation({ mutationFn: markVideoWatched, onSuccess: invalidateProgress })
  const unwatchMutation = useMutation({ mutationFn: markVideoUnwatched, onSuccess: invalidateProgress })

  async function handleOpen(video) {
    await Browser.open({ url: `https://www.youtube.com/watch?v=${video.youtube_id}` })
    watchMutation.mutate({ userId: user.id, videoId: video.id })
  }

  function handleToggleWatched(video) {
    if (video.watched) {
      unwatchMutation.mutate({ userId: user.id, videoId: video.id })
    } else {
      watchMutation.mutate({ userId: user.id, videoId: video.id })
    }
  }

  const isLoading = assessmentQuery.isLoading || videosQuery.isLoading
  const isError = assessmentQuery.isError || videosQuery.isError

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading your growth videos…</p>
  }

  if (isError) {
    return <p className="text-sm text-muted-foreground">Couldn't load your growth videos.</p>
  }

  if (paths.length === 0) {
    return null
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Growth Videos</h2>

      <div className="flex gap-2">
        {paths.map((path) => (
          <button
            key={path}
            type="button"
            onClick={() => setSelectedPath(path)}
            aria-pressed={activePath === path}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors',
              activePath === path
                ? 'border-primary bg-primary/5 font-medium text-primary'
                : 'border-border text-muted-foreground hover:bg-muted',
            )}
          >
            {GROWTH_PATH_NAMES[path]}
          </button>
        ))}
      </div>

      {filteredVideos.length === 0 ? (
        <p className="text-sm text-muted-foreground">No videos yet for this growth path.</p>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onOpen={() => handleOpen(video)}
              onToggleWatched={() => handleToggleWatched(video)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
