import { useState } from 'react'
import { Browser } from '@capacitor/browser'
import { BookPoster } from './BookPoster'
import { isCheckInDue } from './readingSchedule'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ActiveBook({
  book,
  progress,
  checkins,
  onCheckIn,
  isCheckInPending,
  onFinish,
  isFinishPending,
}) {
  const [pagesReported, setPagesReported] = useState('')
  const hasPlan = Boolean(progress.plan_weeks)
  const checkInDue = hasPlan && isCheckInDue(progress, checkins)

  function handleCheckIn() {
    const value = pagesReported.trim()
    onCheckIn(value === '' ? null : Number(value))
    setPagesReported('')
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-3">
          <BookPoster book={book} />
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            {hasPlan && (
              <p className="text-sm text-muted-foreground">
                Week {progress.current_week} of {progress.plan_weeks} · {progress.weekly_page_target}{' '}
                pages/week
              </p>
            )}
          </div>
        </div>

        {book.description ? <p className="text-sm text-muted-foreground">{book.description}</p> : null}

        {checkInDue && (
          <div className="flex flex-col gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
            <p className="text-sm font-medium">Check in for week {progress.current_week}</p>
            <p className="text-xs text-muted-foreground">Target: {progress.weekly_page_target} pages</p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pages-reported">Pages read (optional)</Label>
              <Input
                id="pages-reported"
                type="number"
                min="0"
                inputMode="numeric"
                value={pagesReported}
                onChange={(event) => setPagesReported(event.target.value)}
              />
            </div>
            <Button type="button" size="sm" onClick={handleCheckIn} disabled={isCheckInPending}>
              {isCheckInPending ? 'Saving…' : 'Mark week complete'}
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => Browser.open({ url: book.retailer_url })}
          >
            Get the Book
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onFinish} disabled={isFinishPending}>
            Mark as Finished
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
