import { supabase } from '@/lib/supabase'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export async function startReadingPlan({ userId, bookId, planWeeks, weeklyPageTarget }) {
  const { data, error } = await supabase
    .from('user_reading_progress')
    .upsert(
      {
        user_id: userId,
        book_id: bookId,
        status: 'in_progress',
        plan_weeks: planWeeks,
        weekly_page_target: weeklyPageTarget,
        start_date: today(),
        current_week: 1,
        completed_at: null,
      },
      { onConflict: 'user_id,book_id' },
    )
    .select()
    .single()

  if (error) throw error
  return data
}

export async function completeBook({ progressId }) {
  const { data, error } = await supabase
    .from('user_reading_progress')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('id', progressId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Logs the check-in for the progress row's current week, then either
// advances current_week or, if that was the plan's last week, completes the
// book. Returns the updated user_reading_progress row either way.
export async function submitWeeklyCheckIn({ userId, progress, pagesReported }) {
  const pagesTarget = progress.weekly_page_target
  const hitTarget = pagesReported == null ? true : pagesReported >= pagesTarget

  const { error: checkinError } = await supabase.from('reading_checkins').insert({
    user_id: userId,
    reading_progress_id: progress.id,
    week_number: progress.current_week,
    pages_target: pagesTarget,
    pages_reported: pagesReported ?? null,
    hit_target: hitTarget,
  })

  if (checkinError) throw checkinError

  const nextWeek = progress.current_week + 1
  if (nextWeek > progress.plan_weeks) {
    return completeBook({ progressId: progress.id })
  }

  const { data, error } = await supabase
    .from('user_reading_progress')
    .update({ current_week: nextWeek })
    .eq('id', progress.id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function saveNotificationPreferences({ userId, ...preferences }) {
  const { data, error } = await supabase
    .from('notification_preferences')
    .upsert({ user_id: userId, ...preferences }, { onConflict: 'user_id' })
    .select()
    .single()

  if (error) throw error
  return data
}
