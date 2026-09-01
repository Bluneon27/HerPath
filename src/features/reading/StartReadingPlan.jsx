import { useState } from 'react'
import { BookPoster } from './BookPoster'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PLAN_OPTIONS = [4, 8, 12]
const DEFAULT_PLAN_WEEKS = 8

export function StartReadingPlan({ book, onStart, isPending }) {
  const hasPageCount = Boolean(book.page_count)
  const [planWeeks, setPlanWeeks] = useState(DEFAULT_PLAN_WEEKS)
  const weeklyPageTarget = hasPageCount ? Math.ceil(book.page_count / planWeeks) : null

  function handleStart() {
    onStart(hasPageCount ? { planWeeks, weeklyPageTarget } : { planWeeks: null, weeklyPageTarget: null })
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-3">
          <BookPoster book={book} />
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            {hasPageCount && (
              <p className="text-xs text-muted-foreground">{book.page_count} pages</p>
            )}
          </div>
        </div>

        {hasPageCount ? (
          <>
            <div className="flex gap-2">
              {PLAN_OPTIONS.map((weeks) => (
                <button
                  key={weeks}
                  type="button"
                  onClick={() => setPlanWeeks(weeks)}
                  aria-pressed={planWeeks === weeks}
                  className={cn(
                    'flex-1 rounded-lg border p-2.5 text-sm transition-colors',
                    planWeeks === weeks
                      ? 'border-primary bg-primary/5 font-medium'
                      : 'border-border hover:bg-muted',
                  )}
                >
                  {weeks} weeks
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              That's about {weeklyPageTarget} pages/week.
            </p>
          </>
        ) : null}

        <Button type="button" onClick={handleStart} disabled={isPending}>
          {isPending ? 'Starting…' : hasPageCount ? 'Start Reading Plan' : 'Start Reading'}
        </Button>
      </CardContent>
    </Card>
  )
}
