import { describe, expect, it } from 'vitest'
import { filterArticlesByPath } from './filterArticlesByPath'

const articles = [
  { id: 'a1', growth_paths: ['SP'], sequence_order: 2, read: false },
  { id: 'a2', growth_paths: ['SP', 'PP'], sequence_order: 1, read: true },
  { id: 'a3', growth_paths: ['LR'], sequence_order: 1, read: false },
  { id: 'a4', growth_paths: ['SP'], sequence_order: 3, read: false },
]

describe('filterArticlesByPath', () => {
  it('returns only articles tagged with the given path', () => {
    const result = filterArticlesByPath(articles, 'SP')
    expect(result.map((a) => a.id)).toEqual(['a1', 'a4', 'a2'])
  })

  it('sorts unread articles before read ones, then by sequence_order', () => {
    const result = filterArticlesByPath(articles, 'SP')
    expect(result.map((a) => a.read)).toEqual([false, false, true])
  })

  it('includes articles tagged with more than one path', () => {
    const result = filterArticlesByPath(articles, 'PP')
    expect(result.map((a) => a.id)).toEqual(['a2'])
  })

  it('returns an empty array when no articles match the path', () => {
    expect(filterArticlesByPath(articles, 'PG')).toEqual([])
  })
})
