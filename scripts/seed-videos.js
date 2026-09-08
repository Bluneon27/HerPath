// Seeds/updates the `videos` table from scripts/videos-data.js.
//
// Requires the service_role key (bypasses RLS — videos has no client write
// policy by design). Run with:
//   node --env-file=.env scripts/seed-videos.js
//
// Safe to re-run: rows are upserted on the youtube_id unique constraint, so
// editing videos-data.js and re-running updates existing rows instead of
// duplicating them.

import { createClient } from '@supabase/supabase-js'
import videos from './videos-data.js'

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Missing SUPABASE_URL (or VITE_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY.\n' +
      'Add SUPABASE_SERVICE_ROLE_KEY to .env (from Supabase Dashboard → Settings → API — ' +
      'never commit it) and run: node --env-file=.env scripts/seed-videos.js',
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

async function main() {
  const { data, error } = await supabase
    .from('videos')
    .upsert(videos, { onConflict: 'youtube_id' })
    .select('id, title, growth_paths')

  if (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }

  console.log(`Seeded ${data.length} videos.`)
}

main()
