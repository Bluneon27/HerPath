import { create } from 'zustand'

export const useUiStore = create((set) => ({
  isLoading: false,
  toast: null,

  setLoading: (isLoading) => set({ isLoading }),

  showToast: (message, variant = 'default') => set({ toast: { message, variant } }),
  clearToast: () => set({ toast: null }),
}))
