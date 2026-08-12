import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export function useProfile() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfile(user.id),
    enabled: !!user,
  })
}
