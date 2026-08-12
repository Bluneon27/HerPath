import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { QUESTIONS } from './questions'
import { scoreAssessment } from './scoring'
import { submitAssessment } from './submitAssessment'
import { AssessmentResults } from './AssessmentResults'
import { useAuth } from '@/features/auth/AuthProvider'
import { useUiStore } from '@/store/useUiStore'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

const TOTAL_QUESTIONS = QUESTIONS.length

export function AssessmentPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isLoading, setLoading, showToast, toast, clearToast } = useUiStore()

  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  // The toast store is global; clear out anything left over from the page
  // (e.g. login/sign-up) that sent the user here.
  useEffect(() => {
    clearToast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const question = QUESTIONS[stepIndex]
  const isLastQuestion = stepIndex === TOTAL_QUESTIONS - 1
  const currentAnswer = answers[question.id]
  const isAnswered =
    question.type === 'free-text' ? Boolean(currentAnswer?.trim()) : Boolean(currentAnswer)

  function setAnswer(value) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function goBack() {
    clearToast()
    setStepIndex((index) => Math.max(0, index - 1))
  }

  async function goNext() {
    if (!isAnswered) return
    clearToast()

    if (!isLastQuestion) {
      setStepIndex((index) => index + 1)
      return
    }

    setLoading(true)
    try {
      const scored = scoreAssessment(answers)
      await submitAssessment(user.id, answers)
      // Deliberately not invalidating the assessment-status query yet: this
      // route is also gated by SkipIfAssessed, and refetching now would make
      // it see a completed assessment and immediately redirect away to
      // /home before the results screen ever renders. Invalidate on Continue
      // instead, once the user has actually seen their results.
      setResult(scored)
    } catch (error) {
      showToast(error.message ?? 'Could not save your assessment. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleContinue() {
    await queryClient.invalidateQueries({ queryKey: ['growth-assessment-status', user.id] })
    navigate('/home', { replace: true })
  }

  if (result) {
    return <AssessmentResults result={result} onContinue={handleContinue} />
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <p className="text-center text-sm text-muted-foreground">
          Question {stepIndex + 1} of {TOTAL_QUESTIONS}
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${((stepIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-snug font-medium">{question.text}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {question.type === 'single-select' ? (
            <div className="flex flex-col gap-2.5">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAnswer(option.id)}
                  aria-pressed={currentAnswer === option.id}
                  className={cn(
                    'rounded-xl border p-4 text-left text-sm transition-colors',
                    currentAnswer === option.id
                      ? 'border-primary bg-primary/5 font-medium'
                      : 'border-border hover:bg-muted',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <Textarea
                value={currentAnswer ?? ''}
                onChange={(event) => setAnswer(event.target.value)}
                maxLength={question.maxLength}
                rows={5}
                placeholder="Type your answer…"
              />
              <p className="text-right text-xs text-muted-foreground">
                {(currentAnswer ?? '').length}/{question.maxLength}
              </p>
            </div>
          )}

          {toast ? (
            <p
              className={
                toast.variant === 'error' ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'
              }
            >
              {toast.message}
            </p>
          ) : null}

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={stepIndex === 0 || isLoading}
            >
              Back
            </Button>
            <Button type="button" onClick={goNext} disabled={!isAnswered || isLoading}>
              {isLoading ? 'Saving…' : isLastQuestion ? 'See My Results' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
