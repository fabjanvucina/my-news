import { useEffect, useMemo, useState } from 'react'
import {
  BookmarkedArticlesContext,
  BookmarkedArticlesContextInterface,
} from '../contexts'
import { ArticleCategory } from '../enums'
import { useSearch } from '../hooks'
import { Article } from '../types'
import { getBookmarks } from '../util'

type Props = {
  category: ArticleCategory
  children: React.ReactNode
}

export function BookmarkedArticlesProvider(props: Props) {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([])
  const [loadingBookmarkedArticles, setLoadingBookmarkedArticles] =
    useState(false)

  const { searchTerm } = useSearch()

  useEffect(() => {
    if (props.category !== ArticleCategory.FAVORITES) {
      return
    }

    async function getBookmarkedArticles() {
      setLoadingBookmarkedArticles(true)
      try {
        const bookmarks = await getBookmarks()
        setBookmarkedArticles(bookmarks)
      } catch (e) {
        setBookmarkedArticles([])
      }
      setLoadingBookmarkedArticles(false)
    }

    getBookmarkedArticles()

    return () => {
      setBookmarkedArticles([])
    }
  }, [props.category, searchTerm])

  const contextValue: BookmarkedArticlesContextInterface = useMemo(() => {
    return {
      bookmarkedArticles,
      loadingBookmarkedArticles,
    }
  }, [bookmarkedArticles, loadingBookmarkedArticles])

  return (
    <BookmarkedArticlesContext.Provider value={contextValue}>
      {props.children}
    </BookmarkedArticlesContext.Provider>
  )
}
