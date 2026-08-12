import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'

async function fetchAssessment(userId) {
  const { data, error } = await supabase
    .from('growth_assessments')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}

export function useAssessmentStatus() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['growth-assessment-status', user?.id],
    queryFn: () => fetchAssessment(user.id),
    enabled: !!user,
  })
}
