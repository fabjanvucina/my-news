import { createContext } from 'react'
import { Article } from '../types'

export interface FeaturedArticlesContextInterface {
  featuredArticles: Article[]
  loadingFeaturedArticles: boolean
  featuredArticlesProvidedFromLatestArticles: boolean
}

export const FeaturedArticlesContext = createContext<
  FeaturedArticlesContextInterface | undefined
>(undefined)
