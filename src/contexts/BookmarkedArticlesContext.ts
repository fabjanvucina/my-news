import { createContext } from 'react'
import { Article } from '../types'

export interface BookmarkedArticlesContextInterface {
  bookmarkedArticles: Article[]
  loadingBookmarkedArticles: boolean
}

export const BookmarkedArticlesContext = createContext<
  BookmarkedArticlesContextInterface | undefined
>(undefined)
