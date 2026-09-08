// Pure helper: videos tagged with the given growth path, unwatched first,
// then by sequence_order. Kept dependency-free (no supabase/react-query
// imports) so it can be unit-tested without a browser-like environment.
export function filterVideosByPath(videos, growthPath) {
  return videos
    .filter((video) => video.growth_paths.includes(growthPath))
    .sort((a, b) => {
      if (a.watched !== b.watched) return a.watched ? 1 : -1
      return a.sequence_order - b.sequence_order
    })
}
