import { describe, expect, it } from 'vitest'
import { scoreAssessment } from './scoring'

describe('scoreAssessment', () => {
  it('matches the spec worked example: Q2→LR, Q3→PG, Q4→LR, Q5→PG', () => {
    const result = scoreAssessment({
      q2: 'Q2-B', // LR, weight 4
      q3: 'Q3-C', // PG, weight 3
      q4: 'Q4-C', // LR, weight 3
      q5: 'Q5-A', // PG, weight 2
    })

    expect(result.lrScore).toBe(7)
    expect(result.pgScore).toBe(5)
    expect(result.spScore).toBe(0)
    expect(result.ppScore).toBe(0)
    expect(result.primaryGrowthPath).toBe('LR')
    expect(result.secondaryGrowthPath1).toBe('PG')
    // SP and PP are tied at 0 and neither was picked by Q2-Q5, so the
    // fixed fallback order (SP, LR, PG, PP) breaks the tie.
    expect(result.secondaryGrowthPath2).toBe('SP')
  })

  it('breaks a tie using the Q2 answer when Q2 distinguishes the tied paths (rule 1)', () => {
    const result = scoreAssessment({
      q2: 'Q2-A', // SP, weight 4
      q3: 'Q3-B', // LR, weight 3
      q4: 'Q4-C', // LR, weight 3
      q5: 'Q5-D', // SP, weight 2
    })

    // SP = 4 + 2 = 6, LR = 3 + 3 = 6: tied, and Q2 picked SP.
    expect(result.spScore).toBe(6)
    expect(result.lrScore).toBe(6)
    expect(result.primaryGrowthPath).toBe('SP')
    expect(result.secondaryGrowthPath1).toBe('LR')
  })

  it('falls back to Q3 when Q2 does not distinguish the tied paths (rule 2)', () => {
    const result = scoreAssessment({
      q2: 'Q2-C', // PG, weight 4 (not part of the SP/LR tie)
      q3: 'Q3-A', // SP, weight 3
      q4: 'Q4-C', // LR, weight 3
      q5: 'Q5-C', // PP, weight 2
    })

    // SP = 3, LR = 3: tied. Q2's path (PG) doesn't distinguish them, so
    // Q3's path (SP) decides.
    expect(result.spScore).toBe(3)
    expect(result.lrScore).toBe(3)
    expect(result.primaryGrowthPath).toBe('PG')
    expect(result.secondaryGrowthPath1).toBe('SP')
    expect(result.secondaryGrowthPath2).toBe('LR')
  })

  it('falls back to the fixed SP/LR/PG/PP order when a 3-way tie is untouched by Q2-Q5 (rule 5)', () => {
    const result = scoreAssessment({
      q2: 'Q2-A', // SP, weight 4
      q3: 'Q3-A', // SP, weight 3
      q4: 'Q4-D', // SP, weight 3
      q5: 'Q5-D', // SP, weight 2
    })

    // Every scored question points at SP, so LR/PG/PP are all tied at 0
    // and none of them was ever selected by Q2-Q5.
    expect(result.spScore).toBe(12)
    expect(result.lrScore).toBe(0)
    expect(result.pgScore).toBe(0)
    expect(result.ppScore).toBe(0)
    expect(result.primaryGrowthPath).toBe('SP')
    expect(result.secondaryGrowthPath1).toBe('LR')
    expect(result.secondaryGrowthPath2).toBe('PG')
  })
})
