import { createContext } from 'react'
import { Article } from '../types'

export interface LatestArticlesContextInterface {
  latestArticles: Article[]
  loadingLatestArticles: boolean
  hasMore: boolean
  loadMore: () => Promise<void>
}

export const LatestArticlesContext = createContext<
  LatestArticlesContextInterface | undefined
>(undefined)
