// A book's plan starts on start_date. Week N's check-in becomes due exactly
// N weeks after that (i.e. once "a week has elapsed since start_date +
// (current_week - 1) weeks").
export function checkInDueDate(progress) {
  const due = new Date(`${progress.start_date}T00:00:00`)
  due.setDate(due.getDate() + progress.current_week * 7)
  return due
}

function startOfDay(date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

export function isCheckInDue(progress, checkins, today = new Date()) {
  if (!progress.plan_weeks || !progress.start_date) return false

  const alreadyCheckedIn = checkins.some((checkin) => checkin.week_number === progress.current_week)
  if (alreadyCheckedIn) return false

  return startOfDay(today) >= startOfDay(checkInDueDate(progress))
}
