import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

async function fetchReadingCheckins(progressId) {
  const { data, error } = await supabase
    .from('reading_checkins')
    .select('*')
    .eq('reading_progress_id', progressId)

  if (error) throw error
  return data
}

export function useReadingCheckins(progressId) {
  return useQuery({
    queryKey: ['reading-checkins', progressId],
    queryFn: () => fetchReadingCheckins(progressId),
    enabled: !!progressId,
  })
}
