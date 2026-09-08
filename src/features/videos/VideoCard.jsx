import { useState } from 'react'
import { Check } from 'lucide-react'

function thumbnailUrl(youtubeId) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
}

export function VideoCard({ video, onOpen, onToggleWatched }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false)

  return (
    <div className="flex w-40 shrink-0 flex-col gap-1.5">
      <button
        type="button"
        onClick={onOpen}
        className="relative block aspect-video w-full overflow-hidden rounded-lg bg-muted"
      >
        {thumbnailFailed ? (
          <div className="flex h-full w-full items-center justify-center p-2 text-center text-[0.65rem] leading-tight font-medium text-muted-foreground">
            {video.title}
          </div>
        ) : (
          <img
            src={thumbnailUrl(video.youtube_id)}
            alt={video.title}
            onError={() => setThumbnailFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
        {video.watched && (
          <span className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3" strokeWidth={3} />
          </span>
        )}
      </button>

      <p className="line-clamp-2 text-xs leading-snug font-medium">{video.title}</p>

      <button
        type="button"
        onClick={onToggleWatched}
        className="self-start text-[0.7rem] text-muted-foreground underline-offset-2 hover:underline"
      >
        {video.watched ? 'Mark unwatched' : 'Mark watched'}
      </button>
    </div>
  )
}
