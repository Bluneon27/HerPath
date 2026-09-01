import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'

export const DEFAULT_NOTIFICATION_PREFERENCES = {
  daily_reminder_enabled: true,
  daily_reminder_time: '19:00',
  weekly_checkin_enabled: true,
}

async function fetchNotificationPreferences(userId) {
  const { data, error } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  // No row yet means the user has never touched the settings screen — fall
  // back to the same defaults the table's columns declare.
  return data ?? { user_id: userId, ...DEFAULT_NOTIFICATION_PREFERENCES }
}

export function useNotificationPreferences() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['notification-preferences', user?.id],
    queryFn: () => fetchNotificationPreferences(user.id),
    enabled: !!user,
  })
}
