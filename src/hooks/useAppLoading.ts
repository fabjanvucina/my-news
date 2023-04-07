import { useContext } from 'react'
import { AppLoadingContext } from '../contexts'

export function useAppLoading() {
  const context = useContext(AppLoadingContext)

  if (!context) {
    throw new Error('useAppLoading must be used within an AppLoadingProvider')
  }

  return context
}
