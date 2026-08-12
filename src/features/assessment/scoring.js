import { QUESTIONS } from './questions'

const SCORED_QUESTION_IDS = ['q2', 'q3', 'q4', 'q5']
const PATH_CODES = ['SP', 'LR', 'PG', 'PP']

const SCORED_QUESTIONS = QUESTIONS.filter((q) => SCORED_QUESTION_IDS.includes(q.id))

// answers[questionId] -> selected option -> path code
function pathForAnswer(question, answers) {
  const selectedOptionId = answers[question.id]
  const option = question.options.find((o) => o.id === selectedOptionId)
  return option?.path
}

// Resolves a group of paths tied on score, using the selected paths from
// Q2-Q5 (in that priority order) as sequential tie-breakers: whichever tied
// path matches a question's answer is pulled out first, ahead of the rest
// of the group, which stays tied and moves on to the next question. Any
// still-unresolved paths after Q5 fall back to the fixed SP/LR/PG/PP order.
function resolveTiedGroup(tiedPaths, priorityPaths) {
  let remaining = tiedPaths
  const resolved = []

  for (const priorityPath of priorityPaths) {
    if (remaining.length <= 1) break
    if (priorityPath && remaining.includes(priorityPath)) {
      resolved.push(priorityPath)
      remaining = remaining.filter((path) => path !== priorityPath)
    }
  }

  const fallback = PATH_CODES.filter((path) => remaining.includes(path))
  return [...resolved, ...fallback]
}

function rankPaths(scores, priorityPaths) {
  const byScore = new Map()
  for (const path of PATH_CODES) {
    const score = scores[path]
    if (!byScore.has(score)) byScore.set(score, [])
    byScore.get(score).push(path)
  }

  const scoresDescending = [...byScore.keys()].sort((a, b) => b - a)

  const ranking = []
  for (const score of scoresDescending) {
    const tiedPaths = byScore.get(score)
    if (tiedPaths.length === 1) {
      ranking.push(tiedPaths[0])
    } else {
      ranking.push(...resolveTiedGroup(tiedPaths, priorityPaths))
    }
  }

  return ranking
}

/**
 * Pure scoring function for the Growth Path Assessment.
 *
 * @param {Record<string, string>} answers - map of question id (e.g. 'q2') to
 *   the selected option id (e.g. 'Q2-A'). Only q2-q5 need to be present for
 *   scoring; other questions are ignored here.
 */
export function scoreAssessment(answers) {
  const scores = { SP: 0, LR: 0, PG: 0, PP: 0 }

  for (const question of SCORED_QUESTIONS) {
    const path = pathForAnswer(question, answers)
    if (path) {
      scores[path] += question.weight
    }
  }

  const priorityPaths = SCORED_QUESTIONS.map((question) => pathForAnswer(question, answers))
  const [primaryGrowthPath, secondaryGrowthPath1, secondaryGrowthPath2] = rankPaths(
    scores,
    priorityPaths,
  )

  return {
    spScore: scores.SP,
    lrScore: scores.LR,
    pgScore: scores.PG,
    ppScore: scores.PP,
    primaryGrowthPath,
    secondaryGrowthPath1,
    secondaryGrowthPath2,
  }
}
