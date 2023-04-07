import {
  MOCK_BUSINESS_ARTICLES,
  MOCK_GENERAL_ARTICLES,
  MOCK_HEALTH_ARTICLES,
  MOCK_LATEST_ARTICLES,
  MOCK_SCIENCE_ARTICLES,
  MOCK_SPORTS_ARTICLES,
  MOCK_TECH_ARTICLES,
} from '../../assets/mock-data'
import { ArticleCategory } from '../../enums'
import { ApiDto } from '../types'

export function getMockFeaturedArticles(category: ArticleCategory) {
  switch (category) {
    case ArticleCategory.BUSINESS:
      return MOCK_BUSINESS_ARTICLES
    case ArticleCategory.HEALTH:
      return MOCK_HEALTH_ARTICLES
    case ArticleCategory.SCIENCE:
      return MOCK_SCIENCE_ARTICLES
    case ArticleCategory.SPORTS:
      return MOCK_SPORTS_ARTICLES
    case ArticleCategory.TECHNOLOGY:
      return MOCK_TECH_ARTICLES
    default:
      return MOCK_GENERAL_ARTICLES
  }
}

export function getMockLatestArticlesData() {
  const apiDto: ApiDto = {
    totalResults: MOCK_LATEST_ARTICLES.length,
    articles: MOCK_LATEST_ARTICLES,
  }

  return apiDto
}
