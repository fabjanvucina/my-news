import { ArticleCategory } from '../enums'
import { API_URL, PAGE_SIZE, SOURCES } from './constants'
import { getMockFeaturedArticles, getMockLatestArticlesData } from './mock'
import { ApiDto, ApiError } from './types'

export class NewsApi {
  private readonly API_KEY = String(process.env.REACT_APP_NEWS_API_KEY)
  private readonly PROD = process.env.NODE_ENV === 'production'

  private static instance: NewsApi

  private constructor() {}

  public static getInstance(): NewsApi {
    if (!NewsApi.instance) {
      NewsApi.instance = new NewsApi()
    }

    return NewsApi.instance
  }

  public async getFeaturedArticles(category: ArticleCategory, query: string) {
    if (this.PROD) {
      return getMockFeaturedArticles(category)
    }

    const requestUrl = `${API_URL}/top-headlines?category=${category}&country=us${
      query ? `&q=${encodeURIComponent(query)}` : ''
    }&pageSize=${PAGE_SIZE}&apiKey=${this.API_KEY}`

    const response = await fetch(requestUrl)

    if (!response.ok) {
      if (response.status === 429) {
        alert(
          'Rate limit exceeded. Showing mock data for featured articles. The search functionality will not work.'
        )
        return getMockFeaturedArticles(category)
      }

      const error: ApiError = await JSON.parse(await response.text())
      throw new Error(error.message)
    }

    const { articles }: ApiDto = await response.json()

    return articles
  }

  public async getLatestArticles(query: string, page?: number) {
    if (this.PROD) {
      return getMockLatestArticlesData()
    }

    const requestUrl = `${API_URL}/everything?sources=${SOURCES}${
      query ? `&q=${encodeURIComponent(query)}` : ''
    }&pageSize=${PAGE_SIZE}${page ? `&page=${page}` : ''}&apiKey=${
      this.API_KEY
    }`

    const response = await fetch(requestUrl)

    if (!response.ok) {
      if (response.status === 429) {
        alert(
          'Rate limit exceeded. Showing mock data for latest articles. The search functionality will not work.'
        )
        return getMockLatestArticlesData()
      }

      const error: ApiError = await JSON.parse(await response.text())
      throw new Error(error.message)
    }

    const data: ApiDto = await response.json()

    data.totalResults = 100 // api dev account is limited to 100 articles

    return data
  }
}
