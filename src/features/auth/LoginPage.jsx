import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'
import { useUiStore } from '@/store/useUiStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const DISPLAY_NAME_MAX_LENGTH = 50

export function LoginPage() {
  const { session, signIn, signUp } = useAuth()
  const { isLoading, setLoading, showToast, toast } = useUiStore()
  const [mode, setMode] = useState('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  if (session) {
    return <Navigate to="/home" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    const { error } =
      mode === 'sign-in'
        ? await signIn(email, password)
        : await signUp(email, password, displayName.trim())

    setLoading(false)

    if (error) {
      showToast(error.message, 'error')
      return
    }

    if (mode === 'sign-up') {
      showToast('Account created!', 'success')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{mode === 'sign-in' ? 'Sign in' : 'Create an account'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {mode === 'sign-up' ? (
              <div className="flex flex-col gap-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={DISPLAY_NAME_MAX_LENGTH}
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {toast ? (
              <p
                className={
                  toast.variant === 'error' ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'
                }
              >
                {toast.message}
              </p>
            ) : null}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Sign up'}
            </Button>

            <button
              type="button"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
            >
              {mode === 'sign-in' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
