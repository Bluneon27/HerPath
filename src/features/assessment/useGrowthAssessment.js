import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'

async function fetchLatestGrowthAssessment(userId) {
  const { data, error } = await supabase
    .from('growth_assessments')
    .select('*')
    .eq('user_id', userId)
    .order('assessment_date', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data
}

export function useGrowthAssessment() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['growth-assessment', user?.id],
    queryFn: () => fetchLatestGrowthAssessment(user.id),
    enabled: !!user,
  })
}
