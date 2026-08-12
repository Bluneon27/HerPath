import { GROWTH_PATH_NAMES } from '@/lib/growthPaths'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AssessmentResults({ result, onContinue }) {
  const { primaryGrowthPath, secondaryGrowthPath1, secondaryGrowthPath2 } = result

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <p className="text-center text-sm text-muted-foreground">
        This assessment identifies your current growth focus right now — not who you are.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Your Primary Growth Path</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold">{GROWTH_PATH_NAMES[primaryGrowthPath]}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Supporting Growth Paths</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <p className="text-base font-medium">{GROWTH_PATH_NAMES[secondaryGrowthPath1]}</p>
          <p className="text-base font-medium">{GROWTH_PATH_NAMES[secondaryGrowthPath2]}</p>
        </CardContent>
      </Card>

      <Button type="button" size="lg" onClick={onContinue}>
        Continue
      </Button>
    </div>
  )
}
