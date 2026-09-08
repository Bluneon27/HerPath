import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'

export { filterArticlesByPath } from './filterArticlesByPath'

async function fetchArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('sequence_order', { ascending: true })

  if (error) throw error
  return data
}

async function fetchArticleProgress(userId) {
  const { data, error } = await supabase
    .from('user_article_progress')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

// Fetches the article catalog and the current user's read progress, and
// joins them into a single list, each article annotated with `read`.
export function useGrowthArticles() {
  const { user } = useAuth()

  const articlesQuery = useQuery({ queryKey: ['articles'], queryFn: fetchArticles })
  const progressQuery = useQuery({
    queryKey: ['article-progress', user?.id],
    queryFn: () => fetchArticleProgress(user.id),
    enabled: !!user,
  })

  const isLoading = articlesQuery.isLoading || progressQuery.isLoading
  const isError = articlesQuery.isError || progressQuery.isError

  const data = useMemo(() => {
    if (!articlesQuery.data || !progressQuery.data) return undefined

    const readIds = new Set(progressQuery.data.filter((row) => row.read).map((row) => row.article_id))

    return articlesQuery.data.map((article) => ({ ...article, read: readIds.has(article.id) }))
  }, [articlesQuery.data, progressQuery.data])

  return { data, isLoading, isError }
}
