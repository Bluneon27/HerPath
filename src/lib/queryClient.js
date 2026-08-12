import { QueryClient } from '@tanstack/react-query'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { get, set, del } from 'idb-keyval'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000, // keep cached data around for a day of offline use
      retry: 1,
    },
    mutations: {
      // Tier 1 offline strategy: cached reads survive offline/restart via the
      // persister below. Writes just fail without a network — no mutation
      // queue yet.
      retry: false,
    },
  },
})

// idb-keyval backed storage so the persister survives offline/app restarts
// instead of the size-limited, synchronous localStorage.
const idbStorage = {
  getItem: (key) => get(key),
  setItem: (key, value) => set(key, value),
  removeItem: (key) => del(key),
}

export const queryPersister = createAsyncStoragePersister({
  storage: idbStorage,
  key: 'HERPATH_QUERY_CACHE',
})

export const persistOptions = {
  persister: queryPersister,
  maxAge: 24 * 60 * 60 * 1000,
}
