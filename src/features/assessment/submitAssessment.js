import { supabase } from '@/lib/supabase'
import { QUESTIONS } from './questions'
import { scoreAssessment } from './scoring'

export function buildAssessmentRow(userId, answers) {
  const scored = scoreAssessment(answers)

  const row = {
    user_id: userId,
    assessment_version: '1.0',
    sp_score: scored.spScore,
    lr_score: scored.lrScore,
    pg_score: scored.pgScore,
    pp_score: scored.ppScore,
    primary_growth_path: scored.primaryGrowthPath,
    secondary_growth_path_1: scored.secondaryGrowthPath1,
    secondary_growth_path_2: scored.secondaryGrowthPath2,
  }

  for (const question of QUESTIONS) {
    row[question.field] = answers[question.id]
  }

  return row
}

export async function submitAssessment(userId, answers) {
  const row = buildAssessmentRow(userId, answers)
  const { data, error } = await supabase.from('growth_assessments').insert(row).select().single()
  if (error) throw error
  return data
}
