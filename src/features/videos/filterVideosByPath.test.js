import { describe, expect, it } from 'vitest'
import { filterVideosByPath } from './filterVideosByPath'

const videos = [
  { id: 'v1', growth_paths: ['SP'], sequence_order: 2, watched: false },
  { id: 'v2', growth_paths: ['SP', 'PP'], sequence_order: 1, watched: true },
  { id: 'v3', growth_paths: ['LR'], sequence_order: 1, watched: false },
  { id: 'v4', growth_paths: ['SP'], sequence_order: 3, watched: false },
]

describe('filterVideosByPath', () => {
  it('returns only videos tagged with the given path', () => {
    const result = filterVideosByPath(videos, 'SP')
    expect(result.map((v) => v.id)).toEqual(['v1', 'v4', 'v2'])
  })

  it('sorts unwatched videos before watched ones, then by sequence_order', () => {
    const result = filterVideosByPath(videos, 'SP')
    expect(result.map((v) => v.watched)).toEqual([false, false, true])
  })

  it('includes videos tagged with more than one path', () => {
    const result = filterVideosByPath(videos, 'PP')
    expect(result.map((v) => v.id)).toEqual(['v2'])
  })

  it('returns an empty array when no videos match the path', () => {
    expect(filterVideosByPath(videos, 'PG')).toEqual([])
  })
})
