import { supabase } from '@/lib/supabase'

export async function markArticleRead({ userId, articleId }) {
  const { data, error } = await supabase
    .from('user_article_progress')
    .upsert(
      { user_id: userId, article_id: articleId, read: true, read_at: new Date().toISOString() },
      { onConflict: 'user_id,article_id' },
    )
    .select()
    .single()

  if (error) throw error
  return data
}

export async function markArticleUnread({ userId, articleId }) {
  const { data, error } = await supabase
    .from('user_article_progress')
    .upsert(
      { user_id: userId, article_id: articleId, read: false, read_at: null },
      { onConflict: 'user_id,article_id' },
    )
    .select()
    .single()

  if (error) throw error
  return data
}
