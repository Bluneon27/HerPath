import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'
import { useGrowthAssessment } from '@/features/assessment/useGrowthAssessment'
import { ReadingSection } from '@/features/reading/ReadingSection'
import { GROWTH_PATH_NAMES } from '@/lib/growthPaths'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function GrowthFocusSection() {
  const { data: assessment, isLoading, isError } = useGrowthAssessment()

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading your growth focus…</p>
  }

  if (isError) {
    return <p className="text-sm text-muted-foreground">Couldn't load your growth focus.</p>
  }

  const primaryName = assessment ? GROWTH_PATH_NAMES[assessment.primary_growth_path] : undefined
  const secondaryNames = assessment
    ? [assessment.secondary_growth_path_1, assessment.secondary_growth_path_2]
        .map((code) => GROWTH_PATH_NAMES[code])
        .filter(Boolean)
    : []

  // No row, or a path code we don't recognize: fail quietly rather than
  // rendering broken/undefined text.
  if (!primaryName) {
    return null
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Your Growth Focus</h2>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex flex-col gap-1">
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            Primary Path
          </p>
          <p className="text-2xl font-semibold">{primaryName}</p>
        </CardContent>
      </Card>

      {secondaryNames.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Supporting Focus Areas
          </p>
          <div className="flex flex-wrap gap-2">
            {secondaryNames.map((name) => (
              <span
                key={name}
                className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export function HomePage() {
  const { user, signOut } = useAuth()

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Home</h1>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Signed in as {user?.email}</p>
        <Link to="/settings" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          Settings
        </Link>
      </div>

      <GrowthFocusSection />

      <ReadingSection />
    </div>
  )
}
