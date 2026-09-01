import { useMemo } from 'react'
import { useAuth } from '@/features/auth/AuthProvider'
import { useGrowthAssessment } from '@/features/assessment/useGrowthAssessment'
import { useBooks } from './useBooks'
import { useReadingProgress } from './useReadingProgress'
import { recommendBook } from './recommendation'

// Combines the user's growth assessment, the book catalog, and their
// reading progress into the single book they should see on the home
// screen: the active in-progress book, or the next recommended one.
export function useGrowthReading() {
  const { user } = useAuth()
  const assessmentQuery = useGrowthAssessment()
  const booksQuery = useBooks()
  const progressQuery = useReadingProgress()

  const isLoading = assessmentQuery.isLoading || booksQuery.isLoading || progressQuery.isLoading
  const isError = assessmentQuery.isError || booksQuery.isError || progressQuery.isError

  const ready = Boolean(assessmentQuery.data && booksQuery.data && progressQuery.data)

  const recommendedBook = useMemo(() => {
    if (!ready) return undefined

    return recommendBook({
      primaryGrowthPath: assessmentQuery.data.primary_growth_path,
      secondaryGrowthPath1: assessmentQuery.data.secondary_growth_path_1,
      secondaryGrowthPath2: assessmentQuery.data.secondary_growth_path_2,
      books: booksQuery.data,
      progress: progressQuery.data,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, assessmentQuery.data, booksQuery.data, progressQuery.data])

  const progress = recommendedBook
    ? progressQuery.data?.find((row) => row.book_id === recommendedBook.id)
    : undefined

  return {
    userId: user?.id,
    isLoading,
    isError,
    recommendedBook, // undefined while loading, null when nothing left to recommend
    progress, // the matching user_reading_progress row, if any
  }
}
