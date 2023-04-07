import localforage from 'localforage'
import { Article } from '../types'

export async function getBookmarks(query?: string) {
  let bookmarks = await localforage.getItem<Map<string, Article>>('bookmarks')

  if (!bookmarks) {
    return []
  }

  const bookmarksArr = Array.from(bookmarks.values())

  if (query) {
    return bookmarksArr.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  return bookmarksArr
}

export async function addArticleToBookmarks(article: Article) {
  let bookmarks = await localforage.getItem<Map<string, Article>>('bookmarks')

  if (!bookmarks) {
    bookmarks = new Map()
  }

  bookmarks.set(article.url, article)
  await localforage.setItem('bookmarks', bookmarks)
}

export async function removeArticleFromBookmarks(article: Article) {
  const bookmarks = await localforage.getItem<Map<string, Article>>('bookmarks')

  if (!bookmarks) {
    return
  }

  bookmarks.delete(article.url)
  await localforage.setItem('bookmarks', bookmarks)
}

export async function isArticleBookmarked(article: Article) {
  const bookmarks = await localforage.getItem<Map<string, Article>>('bookmarks')

  if (!bookmarks) {
    return false
  }

  return bookmarks.has(article.url)
}
