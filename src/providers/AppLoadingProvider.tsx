import { useMemo } from 'react'
import { AppLoadingContext, AppLoadingContextInterface } from '../contexts'
import {
  useBookmarkedArticles,
  useFeaturedArticles,
  useLatestArticles,
} from '../hooks'

type Props = {
  children: React.ReactNode
}

export function AppLoadingProvider(props: Props) {
  const { loadingBookmarkedArticles } = useBookmarkedArticles()
  const { loadingLatestArticles } = useLatestArticles()
  const { loadingFeaturedArticles } = useFeaturedArticles()

  const contextValue: AppLoadingContextInterface = useMemo(() => {
    return {
      appLoading:
        loadingBookmarkedArticles ||
        loadingLatestArticles ||
        loadingFeaturedArticles,
    }
  }, [
    loadingBookmarkedArticles,
    loadingLatestArticles,
    loadingFeaturedArticles,
  ])

  return (
    <AppLoadingContext.Provider value={contextValue}>
      {props.children}
    </AppLoadingContext.Provider>
  )
}
