import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'

async function fetchReadingProgress(userId) {
  const { data, error } = await supabase
    .from('user_reading_progress')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

export function useReadingProgress() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['reading-progress', user?.id],
    queryFn: () => fetchReadingProgress(user.id),
    enabled: !!user,
  })
}
