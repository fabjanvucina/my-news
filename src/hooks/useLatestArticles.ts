import { useContext } from 'react'
import { LatestArticlesContext } from '../contexts'

export function useLatestArticles() {
  const context = useContext(LatestArticlesContext)

  if (!context) {
    throw new Error(
      'useLatestArticles must be used within an LatestArticlesProvider'
    )
  }

  return context
}
