import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'

export function ProtectedRoute() {
  const { session, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
