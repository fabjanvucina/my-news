import { useContext } from 'react'
import { SearchContext } from '../contexts'

export function useSearch() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within an SearchProvider')
  }

  return context
}
