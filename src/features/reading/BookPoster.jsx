import { useState } from 'react'
import { cn } from '@/lib/utils'

// Covers a missing cover_image_url and a dead/broken image URL with the
// same graceful fallback: a styled placeholder showing the title instead.
export function BookPoster({ book, className }) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !book.cover_image_url || failed

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          'flex aspect-[2/3] w-20 shrink-0 items-center justify-center rounded-lg bg-muted p-2 text-center text-[0.65rem] leading-tight font-medium text-muted-foreground',
          className,
        )}
      >
        {book.title}
      </div>
    )
  }

  return (
    <img
      src={book.cover_image_url}
      alt={`Cover of ${book.title}`}
      onError={() => setFailed(true)}
      className={cn('aspect-[2/3] w-20 shrink-0 rounded-lg object-cover shadow-sm', className)}
    />
  )
}
