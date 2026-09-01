import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import { checkInDueDate } from '@/features/reading/readingSchedule'

// Fixed ids so re-scheduling first cancels, rather than piling up duplicates.
const NOTIFICATION_IDS = {
  DAILY_REMINDER: 9001,
  WEEKLY_CHECKIN: 9002,
}

export async function requestReadingNotificationPermission() {
  if (!Capacitor.isNativePlatform()) return false

  const status = await LocalNotifications.checkPermissions()
  if (status.display === 'granted') return true
  if (status.display === 'denied') return false

  const requested = await LocalNotifications.requestPermissions()
  return requested.display === 'granted'
}

export async function cancelReadingNotifications() {
  if (!Capacitor.isNativePlatform()) return

  await LocalNotifications.cancel({
    notifications: [{ id: NOTIFICATION_IDS.DAILY_REMINDER }, { id: NOTIFICATION_IDS.WEEKLY_CHECKIN }],
  })
}

function parseTime(time) {
  const [hour, minute] = time.split(':').map(Number)
  return { hour, minute }
}

// Cancels any existing reading notifications and, if a book is active,
// schedules the daily reminder (and the weekly check-in reminder, for books
// on a defined plan) around the user's current preferences.
export async function syncReadingNotifications({ book, progress, preferences }) {
  await cancelReadingNotifications()

  if (!Capacitor.isNativePlatform()) return
  if (!book || !progress || progress.status !== 'in_progress') return
  if (!preferences?.daily_reminder_enabled) return

  const { hour, minute } = parseTime(preferences.daily_reminder_time)

  const notifications = [
    {
      id: NOTIFICATION_IDS.DAILY_REMINDER,
      title: 'Time to read',
      body: progress.weekly_page_target
        ? `Keep going on "${book.title}" — aim for ${progress.weekly_page_target} pages this week.`
        : `Keep going on "${book.title}".`,
      schedule: { on: { hour, minute }, repeats: true, allowWhileIdle: true },
    },
  ]

  if (progress.plan_weeks && preferences.weekly_checkin_enabled) {
    notifications.push({
      id: NOTIFICATION_IDS.WEEKLY_CHECKIN,
      title: 'Weekly check-in ready',
      body: `Your week ${progress.current_week} check-in for "${book.title}" is ready.`,
      schedule: { at: checkInDueDate(progress), allowWhileIdle: true },
    })
  }

  await LocalNotifications.schedule({ notifications })
}
