import { describe, expect, it } from 'vitest'
import { recommendBook } from './recommendation'

const books = [
  { id: 'sp-1', growth_path: 'SP', sequence_order: 1, title: 'SP Book 1' },
  { id: 'sp-2', growth_path: 'SP', sequence_order: 2, title: 'SP Book 2' },
  { id: 'lr-1', growth_path: 'LR', sequence_order: 1, title: 'LR Book 1' },
  { id: 'lr-2', growth_path: 'LR', sequence_order: 2, title: 'LR Book 2' },
  { id: 'pg-1', growth_path: 'PG', sequence_order: 1, title: 'PG Book 1' },
]

describe('recommendBook', () => {
  it('recommends the first primary-path book by sequence_order for a fresh user', () => {
    const result = recommendBook({
      primaryGrowthPath: 'SP',
      secondaryGrowthPath1: 'LR',
      secondaryGrowthPath2: 'PG',
      books,
      progress: [],
    })

    expect(result?.id).toBe('sp-1')
  })

  it('falls through to secondary_growth_path_1 once the primary path is fully completed', () => {
    const progress = [
      { book_id: 'sp-1', status: 'completed' },
      { book_id: 'sp-2', status: 'completed' },
    ]

    const result = recommendBook({
      primaryGrowthPath: 'SP',
      secondaryGrowthPath1: 'LR',
      secondaryGrowthPath2: 'PG',
      books,
      progress,
    })

    expect(result?.id).toBe('lr-1')
  })

  it('returns the in_progress book regardless of sequence order or path', () => {
    const progress = [
      { book_id: 'lr-2', status: 'in_progress' },
      { book_id: 'sp-1', status: 'not_started' },
    ]

    const result = recommendBook({
      primaryGrowthPath: 'SP',
      secondaryGrowthPath1: 'LR',
      secondaryGrowthPath2: 'PG',
      books,
      progress,
    })

    expect(result?.id).toBe('lr-2')
  })

  it('returns null when every book across all three paths is completed', () => {
    const progress = books.map((book) => ({ book_id: book.id, status: 'completed' }))

    const result = recommendBook({
      primaryGrowthPath: 'SP',
      secondaryGrowthPath1: 'LR',
      secondaryGrowthPath2: 'PG',
      books,
      progress,
    })

    expect(result).toBeNull()
  })
})
