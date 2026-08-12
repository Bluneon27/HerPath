import { Navigate, Outlet } from 'react-router-dom'
import { useAssessmentStatus } from '@/features/assessment/useAssessmentStatus'

export function SkipIfAssessed() {
  const { data: assessment, isLoading } = useAssessmentStatus()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (assessment) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}
