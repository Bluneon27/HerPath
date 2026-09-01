import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGrowthReading } from './useGrowthReading'
import { useReadingCheckins } from './useReadingCheckins'
import { useNotificationPreferences } from './useNotificationPreferences'
import { startReadingPlan, submitWeeklyCheckIn, completeBook } from './mutations'
import { requestReadingNotificationPermission, syncReadingNotifications } from '@/lib/readingNotifications'
import { StartReadingPlan } from './StartReadingPlan'
import { ActiveBook } from './ActiveBook'

export function ReadingSection() {
  const { userId, isLoading, isError, recommendedBook, progress } = useGrowthReading()
  const checkinsQuery = useReadingCheckins(progress?.id)
  const preferencesQuery = useNotificationPreferences()
  const queryClient = useQueryClient()
  const [justCompletedTitle, setJustCompletedTitle] = useState(null)

  useEffect(() => {
    requestReadingNotificationPermission()
  }, [])

  useEffect(() => {
    if (!justCompletedTitle) return
    const timer = setTimeout(() => setJustCompletedTitle(null), 4000)
    return () => clearTimeout(timer)
  }, [justCompletedTitle])

  const invalidateReadingQueries = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ['reading-progress', userId] }),
      progress ? queryClient.invalidateQueries({ queryKey: ['reading-checkins', progress.id] }) : null,
    ])

  const startMutation = useMutation({
    mutationFn: startReadingPlan,
    onSuccess: async (newProgress) => {
      await invalidateReadingQueries()
      await syncReadingNotifications({
        book: recommendedBook,
        progress: newProgress,
        preferences: preferencesQuery.data,
      })
    },
  })

  const checkInMutation = useMutation({
    mutationFn: submitWeeklyCheckIn,
    onSuccess: async (updatedProgress) => {
      await invalidateReadingQueries()
      if (updatedProgress.status === 'completed') {
        setJustCompletedTitle(recommendedBook.title)
      }
      await syncReadingNotifications({
        book: recommendedBook,
        progress: updatedProgress,
        preferences: preferencesQuery.data,
      })
    },
  })

  const finishMutation = useMutation({
    mutationFn: completeBook,
    onSuccess: async () => {
      await invalidateReadingQueries()
      setJustCompletedTitle(recommendedBook.title)
      await syncReadingNotifications({ book: null, progress: null, preferences: preferencesQuery.data })
    },
  })

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading your growth reading…</p>
  }

  if (isError) {
    return <p className="text-sm text-muted-foreground">Couldn't load your growth reading.</p>
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Your Growth Reading</h2>

      {justCompletedTitle ? (
        <p className="text-sm font-medium text-primary">You finished "{justCompletedTitle}"! 🎉</p>
      ) : null}

      {!recommendedBook ? (
        <p className="text-sm text-muted-foreground">
          You've completed every recommended book in your growth paths!
        </p>
      ) : progress?.status === 'in_progress' ? (
        <ActiveBook
          book={recommendedBook}
          progress={progress}
          checkins={checkinsQuery.data ?? []}
          onCheckIn={(pagesReported) => checkInMutation.mutate({ userId, progress, pagesReported })}
          isCheckInPending={checkInMutation.isPending}
          onFinish={() => finishMutation.mutate({ progressId: progress.id })}
          isFinishPending={finishMutation.isPending}
        />
      ) : (
        <StartReadingPlan
          book={recommendedBook}
          isPending={startMutation.isPending}
          onStart={({ planWeeks, weeklyPageTarget }) =>
            startMutation.mutate({ userId, bookId: recommendedBook.id, planWeeks, weeklyPageTarget })
          }
        />
      )}
    </section>
  )
}
