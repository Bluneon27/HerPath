// Pure helper: articles tagged with the given growth path, unread first,
// then by sequence_order. Kept dependency-free (no supabase/react-query
// imports) so it can be unit-tested without a browser-like environment.
export function filterArticlesByPath(articles, growthPath) {
  return articles
    .filter((article) => article.growth_paths.includes(growthPath))
    .sort((a, b) => {
      if (a.read !== b.read) return a.read ? 1 : -1
      return a.sequence_order - b.sequence_order
    })
}
