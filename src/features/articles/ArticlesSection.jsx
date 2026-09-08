import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Browser } from '@capacitor/browser'
import { useAuth } from '@/features/auth/AuthProvider'
import { useGrowthAssessment } from '@/features/assessment/useGrowthAssessment'
import { useGrowthArticles, filterArticlesByPath } from './useGrowthArticles'
import { markArticleRead, markArticleUnread } from './mutations'
import { ArticleCard } from './ArticleCard'
import { GROWTH_PATH_NAMES } from '@/lib/growthPaths'
import { cn } from '@/lib/utils'

export function ArticlesSection() {
  const { user } = useAuth()
  const assessmentQuery = useGrowthAssessment()
  const articlesQuery = useGrowthArticles()
  const queryClient = useQueryClient()
  const [selectedPath, setSelectedPath] = useState(null)

  const paths = useMemo(() => {
    if (!assessmentQuery.data) return []
    return [
      assessmentQuery.data.primary_growth_path,
      assessmentQuery.data.secondary_growth_path_1,
      assessmentQuery.data.secondary_growth_path_2,
    ].filter(Boolean)
  }, [assessmentQuery.data])

  const activePath = selectedPath ?? paths[0]

  const filteredArticles = useMemo(() => {
    if (!articlesQuery.data || !activePath) return []
    return filterArticlesByPath(articlesQuery.data, activePath)
  }, [articlesQuery.data, activePath])

  const invalidateProgress = () =>
    queryClient.invalidateQueries({ queryKey: ['article-progress', user.id] })

  const readMutation = useMutation({ mutationFn: markArticleRead, onSuccess: invalidateProgress })
  const unreadMutation = useMutation({ mutationFn: markArticleUnread, onSuccess: invalidateProgress })

  async function handleOpen(article) {
    await Browser.open({ url: article.url })
    readMutation.mutate({ userId: user.id, articleId: article.id })
  }

  function handleToggleRead(article) {
    if (article.read) {
      unreadMutation.mutate({ userId: user.id, articleId: article.id })
    } else {
      readMutation.mutate({ userId: user.id, articleId: article.id })
    }
  }

  const isLoading = assessmentQuery.isLoading || articlesQuery.isLoading
  const isError = assessmentQuery.isError || articlesQuery.isError

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading your growth articles…</p>
  }

  if (isError) {
    return <p className="text-sm text-muted-foreground">Couldn't load your growth articles.</p>
  }

  if (paths.length === 0) {
    return null
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Growth Articles</h2>

      <div className="flex gap-2">
        {paths.map((path) => (
          <button
            key={path}
            type="button"
            onClick={() => setSelectedPath(path)}
            aria-pressed={activePath === path}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors',
              activePath === path
                ? 'border-primary bg-primary/5 font-medium text-primary'
                : 'border-border text-muted-foreground hover:bg-muted',
            )}
          >
            {GROWTH_PATH_NAMES[path]}
          </button>
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <p className="text-sm text-muted-foreground">No articles yet for this growth path.</p>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={() => handleOpen(article)}
              onToggleRead={() => handleToggleRead(article)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
