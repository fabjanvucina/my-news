import { useContext } from 'react'
import { FeaturedArticlesContext } from '../contexts'

export function useFeaturedArticles() {
  const context = useContext(FeaturedArticlesContext)

  if (!context) {
    throw new Error(
      'useFeaturedArticles must be used within an FeaturedArticlesProvider'
    )
  }

  return context
}
