import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'

// Minimal registration wiring only — no notification handling/UI yet.
export async function initPushNotifications() {
  if (!Capacitor.isNativePlatform()) return

  const permission = await PushNotifications.checkPermissions()
  if (permission.receive === 'prompt') {
    await PushNotifications.requestPermissions()
  }

  await PushNotifications.register()

  PushNotifications.addListener('registration', (token) => {
    console.log('Push registration success, token:', token.value)
  })

  PushNotifications.addListener('registrationError', (error) => {
    console.error('Push registration error:', error)
  })

  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('Push notification received:', notification)
  })

  PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
    console.log('Push notification action performed:', action)
  })
}
