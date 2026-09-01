import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

async function fetchBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('growth_path', { ascending: true })
    .order('sequence_order', { ascending: true })

  if (error) throw error
  return data
}

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  })
}
