import { createClient } from '@supabase/supabase-js'
import { Preferences } from '@capacitor/preferences'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Copy .env.example to .env and fill in your Supabase project values.',
  )
}

// Supabase's default auth storage falls back to localStorage, which isn't
// reliably persisted in a native WebView. Back it with Capacitor Preferences
// instead so sessions survive app restarts on iOS/Android.
const capacitorPreferencesStorage = {
  async getItem(key) {
    const { value } = await Preferences.get({ key })
    return value
  },
  async setItem(key, value) {
    await Preferences.set({ key, value })
  },
  async removeItem(key) {
    await Preferences.remove({ key })
  },
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: capacitorPreferencesStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
