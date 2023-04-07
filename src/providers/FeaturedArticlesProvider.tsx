import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { NewsApi, PAGE_SIZE } from '../api'
import {
  FeaturedArticlesContext,
  FeaturedArticlesContextInterface,
} from '../contexts'
import { ArticleCategory } from '../enums'
import { useLatestArticles, useSearch } from '../hooks'
import { handleError } from '../util'

const newsApi = NewsApi.getInstance()

type Props = {
  category: ArticleCategory
  children: React.ReactNode
}

export function FeaturedArticlesProvider(props: Props) {
  const { searchTerm } = useSearch()
  const { latestArticles } = useLatestArticles()

  async function getFeaturedArticles() {
    if (props.category === ArticleCategory.FAVORITES) {
      return []
    }

    try {
      const featuredArticles = await newsApi.getFeaturedArticles(
        props.category,
        searchTerm
      )
      return featuredArticles
    } catch (e) {
      handleError(e)
      return []
    }
  }

  const query = useQuery({
    queryKey: ['featuredArticles', props.category, searchTerm],
    queryFn: getFeaturedArticles,
    staleTime: 1000 * 60 * 5,
  })

  const contextValue: FeaturedArticlesContextInterface = useMemo(() => {
    if (!query.data) {
      return {
        featuredArticles: [],
        loadingFeaturedArticles: query.isLoading,
        featuredArticlesProvidedFromLatestArticles: false,
      }
    }

    return {
      featuredArticles:
        query.data.length > 0 ? query.data : latestArticles.slice(0, PAGE_SIZE), // explained in README.md
      loadingFeaturedArticles: query.isLoading,
      featuredArticlesProvidedFromLatestArticles: query.data.length === 0,
    }
  }, [latestArticles, query.data, query.isLoading])

  return (
    <FeaturedArticlesContext.Provider value={contextValue}>
      {props.children}
    </FeaturedArticlesContext.Provider>
  )
}
