export type Article = {
  title: string
  author: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
}
