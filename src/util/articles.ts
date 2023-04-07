import { Article } from '../types'

export function removeDuplicateArticles(articles: Article[]) {
  const uniqueArticles = new Set()

  return articles.filter((article) => {
    const isUnique = !uniqueArticles.has(article.url)

    uniqueArticles.add(article.url)

    return isUnique
  })
}
