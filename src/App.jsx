import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { queryClient, persistOptions } from '@/lib/queryClient'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { RequireAssessment } from '@/routes/RequireAssessment'
import { SkipIfAssessed } from '@/routes/SkipIfAssessed'
import { LoginPage } from '@/features/auth/LoginPage'
import { HomePage } from '@/routes/HomePage'
import { AssessmentPage } from '@/features/assessment/AssessmentPage'
import { initPushNotifications } from '@/lib/pushNotifications'

function App() {
  useEffect(() => {
    initPushNotifications()
  }, [])

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<SkipIfAssessed />}>
                <Route path="/assessment" element={<AssessmentPage />} />
              </Route>
              <Route element={<RequireAssessment />}>
                <Route path="/home" element={<HomePage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </PersistQueryClientProvider>
  )
}

export default App
