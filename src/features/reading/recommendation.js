/**
 * Pure recommendation function for the Growth Reading feature.
 *
 * @param {object} args
 * @param {string} args.primaryGrowthPath
 * @param {string} args.secondaryGrowthPath1
 * @param {string} args.secondaryGrowthPath2
 * @param {Array} args.books - all rows from the `books` table
 * @param {Array} args.progress - the user's `user_reading_progress` rows
 * @returns {object|null} the recommended/active book row, or null if every
 *   book across the three paths is already completed.
 */
export function recommendBook({
  primaryGrowthPath,
  secondaryGrowthPath1,
  secondaryGrowthPath2,
  books,
  progress,
}) {
  const inProgress = progress.find((row) => row.status === 'in_progress')
  if (inProgress) {
    return books.find((book) => book.id === inProgress.book_id) ?? null
  }

  const completedBookIds = new Set(
    progress.filter((row) => row.status === 'completed').map((row) => row.book_id),
  )

  const pathOrder = [primaryGrowthPath, secondaryGrowthPath1, secondaryGrowthPath2]

  for (const growthPath of pathOrder) {
    if (!growthPath) continue

    const nextInPath = books
      .filter((book) => book.growth_path === growthPath)
      .sort((a, b) => a.sequence_order - b.sequence_order)
      .find((book) => !completedBookIds.has(book.id))

    if (nextInPath) return nextInPath
  }

  return null
}
