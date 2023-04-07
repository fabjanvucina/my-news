import { useEffect, useMemo, useState } from 'react'
import { ApiDto, NewsApi, PAGE_SIZE } from '../api'
import {
  LatestArticlesContext,
  LatestArticlesContextInterface,
} from '../contexts'
import { useSearch } from '../hooks'
import { handleError, removeDuplicateArticles } from '../util'

const newsApi = NewsApi.getInstance()

type Props = {
  children: React.ReactNode
}

export function LatestArticlesProvider(props: Props) {
  const [latestArticlesData, setLatestArticlesData] = useState<ApiDto | null>(
    null
  )
  const [loadingLatestArticles, setLoadingLatestArticles] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { searchTerm } = useSearch()

  useEffect(() => {
    async function getLatestArticles() {
      setLoadingLatestArticles(true)
      try {
        const latestArticlesData = await newsApi.getLatestArticles(searchTerm)
        setLatestArticlesData(latestArticlesData)
      } catch (e) {
        handleError(e)
        setLatestArticlesData(null)
      }
      setLoadingLatestArticles(false)
    }

    getLatestArticles()

    return () => {
      setLatestArticlesData(null)
    }
  }, [searchTerm])

  const contextValue: LatestArticlesContextInterface = useMemo(() => {
    async function loadMore() {
      try {
        const latestArticlesData = await newsApi.getLatestArticles(
          searchTerm,
          currentPage + 1
        )
        setLatestArticlesData((prev) => {
          if (!prev) return latestArticlesData
          return {
            totalResults: latestArticlesData.totalResults,
            articles: [...prev.articles, ...latestArticlesData.articles],
          }
        })
        setCurrentPage((prev) => prev + 1)
      } catch (e) {
        handleError(e)
        setLatestArticlesData(null)
      }
    }

    if (!latestArticlesData)
      return {
        latestArticles: [],
        loadingLatestArticles,
        hasMore: false,
        loadMore: () => Promise.resolve(),
      }

    return {
      latestArticles: removeDuplicateArticles(latestArticlesData.articles),
      loadingLatestArticles,
      hasMore:
        latestArticlesData.articles.length + PAGE_SIZE <
        latestArticlesData.totalResults,
      loadMore,
    }
  }, [latestArticlesData, loadingLatestArticles, currentPage, searchTerm])

  return (
    <LatestArticlesContext.Provider value={contextValue}>
      {props.children}
    </LatestArticlesContext.Provider>
  )
}
