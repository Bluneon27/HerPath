# HerPath

Mobile-first productivity app. React + Vite (JavaScript) web app, wrapped with Capacitor for iOS/Android, backed by Supabase for auth/database/storage.

## Stack

- React + Vite (plain JavaScript)
- Capacitor (iOS + Android)
- Supabase (`@supabase/supabase-js`) — auth, database, storage
- TanStack Query — server state, with an IndexedDB persister for offline reads
- Zustand — local UI state
- React Router — navigation
- Tailwind CSS + shadcn/ui — styling/components

## Project structure

```
src/
  features/   # feature folders (auth, profile, ...) — colocated components/hooks/queries
  lib/        # supabase.js, queryClient.js, pushNotifications.js
  hooks/
  routes/     # route-level pages + ProtectedRoute
  components/ # shared + shadcn/ui components
  store/      # zustand stores
capacitor.config.json
android/
ios/
```

## 1. Install dependencies

```bash
npm install
```

## 2. Configure Supabase

Copy the example env file and fill in your Supabase project's URL and anon key (Project Settings → API in the Supabase dashboard):

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

`.env` is gitignored — never commit it.

The example query hook in [src/features/profile/useProfile.js](src/features/profile/useProfile.js) expects a `profiles` table with an `id` column matching `auth.users.id`. Create one (with RLS enabled, e.g. "users can select their own row") if you want the Home page's example query to return data instead of an error.

## 3. Run the web app

```bash
npm run dev
```

Opens the app in the browser at the login page. Sign up/sign in exercises real Supabase auth against the project configured above.

## 4. Build + sync to native platforms

```bash
npm run build
```

`build` runs `vite build` and then automatically runs `cap sync` (wired as a `postbuild` script) to copy the web output and installed plugins into `android/` and `ios/`. You can also run sync on its own:

```bash
npm run cap:sync
```

### Run on iOS (macOS + Xcode required)

```bash
npx cap open ios
```

Opens the project in Xcode. Select a simulator or a connected device and run. First run may require `cd ios/App && pod install` if CocoaPods dependencies haven't been resolved yet.

### Run on Android (Android Studio required)

```bash
npx cap open android
```

Opens the project in Android Studio. Let Gradle sync finish, then select a device/emulator and run.

### After changing the native app id or name

The app currently uses the placeholder application id `com.myapp.app` and name "MyApp" (set in [capacitor.config.json](capacitor.config.json)). To change them, update `capacitor.config.json` plus the native project files, then re-sync — see the [Capacitor docs on changing the app id](https://capacitorjs.com/docs/cli/commands/init).

## Native plugins installed (minimal setup only)

- `@capacitor/camera`
- `@capacitor/push-notifications` — permission request + listener registration wired in [src/lib/pushNotifications.js](src/lib/pushNotifications.js), invoked once on app start (native only)
- `@capacitor/preferences` — backs the Supabase auth storage adapter in [src/lib/supabase.js](src/lib/supabase.js)
- `@capacitor/network`
- `capacitor-native-biometric`

None of these beyond Preferences/auth are wired into UI yet — install and minimal registration only, per the scaffold scope.

## Offline data strategy (tier 1)

TanStack Query's cache is persisted to IndexedDB (via `idb-keyval`) using `@tanstack/query-async-storage-persister`, wired in [src/lib/queryClient.js](src/lib/queryClient.js) and [src/App.jsx](src/App.jsx). Cached reads are available offline and survive app restarts. Writes are not queued — a mutation attempted offline simply fails; there's no retry/sync queue yet.
