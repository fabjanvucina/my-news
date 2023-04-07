import { useContext } from 'react'
import { BookmarkedArticlesContext } from '../contexts'

export function useBookmarkedArticles() {
  const context = useContext(BookmarkedArticlesContext)

  if (!context) {
    throw new Error(
      'useBookmarkedArticles must be used within an BookmarkedArticlesProvider'
    )
  }

  return context
}
