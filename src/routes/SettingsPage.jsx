import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/auth/AuthProvider'
import { useNotificationPreferences } from '@/features/reading/useNotificationPreferences'
import { saveNotificationPreferences } from '@/features/reading/mutations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function SettingsPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const { data: preferences, isLoading } = useNotificationPreferences()

  const [dailyEnabled, setDailyEnabled] = useState(true)
  const [dailyTime, setDailyTime] = useState('19:00')
  const [weeklyEnabled, setWeeklyEnabled] = useState(true)

  useEffect(() => {
    if (!preferences) return
    setDailyEnabled(preferences.daily_reminder_enabled)
    setDailyTime(preferences.daily_reminder_time?.slice(0, 5) ?? '19:00')
    setWeeklyEnabled(preferences.weekly_checkin_enabled)
  }, [preferences])

  const saveMutation = useMutation({
    mutationFn: saveNotificationPreferences,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['notification-preferences', user.id] }),
  })

  function handleSave() {
    saveMutation.mutate({
      userId: user.id,
      daily_reminder_enabled: dailyEnabled,
      daily_reminder_time: dailyTime,
      weekly_checkin_enabled: weeklyEnabled,
    })
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notification Settings</h1>
        <Link to="/home" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          Back
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Reading Reminders</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="daily-enabled">Daily reading reminder</Label>
              <Switch
                id="daily-enabled"
                checked={dailyEnabled}
                onCheckedChange={(checked) => setDailyEnabled(checked)}
              />
            </div>

            {dailyEnabled ? (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="daily-time">Reminder time</Label>
                <Input
                  id="daily-time"
                  type="time"
                  value={dailyTime}
                  onChange={(event) => setDailyTime(event.target.value)}
                />
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="weekly-enabled">Weekly check-in reminder</Label>
              <Switch
                id="weekly-enabled"
                checked={weeklyEnabled}
                onCheckedChange={(checked) => setWeeklyEnabled(checked)}
              />
            </div>

            <Button type="button" onClick={handleSave} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving…' : 'Save'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
