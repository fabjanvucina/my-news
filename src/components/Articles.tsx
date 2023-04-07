import { useState } from 'react'
import classNames from 'classnames'
import { ArticleCategory, ArticlesDisplayMode } from '../enums'
import { LatestArticlesWidget } from './LatestArticlesWidget'
import { ArticleCard } from './ArticleCard'
import { EmptyIcon } from '../util'
import { useBookmarkedArticles, useFeaturedArticles, useSearch } from '../hooks'
import { ArticlesDisplayModeButton } from './ArticlesDisplayModeButton'

type Props = {
  category: ArticleCategory
}

export function Articles(props: Props) {
  const { searchTerm } = useSearch()
  const { bookmarkedArticles } = useBookmarkedArticles()
  const { featuredArticles, featuredArticlesProvidedFromLatestArticles } =
    useFeaturedArticles()

  const [articlesDisplayMode, setArticlesDisplayMode] = useState(
    ArticlesDisplayMode.FEATURED
  )

  const articlesDisplayedWithCards =
    props.category === ArticleCategory.FAVORITES
      ? bookmarkedArticles
      : featuredArticles

  // this is transitive, if they are empty, featured articles are provided from the latest articles and if the latest articles are empty, then there are no articles
  const noArticlesFound = articlesDisplayedWithCards.length === 0

  return (
    <div className="width-100">
      <div className="featured-or-latest">
        <ArticlesDisplayModeButton
          displayMode={ArticlesDisplayMode.FEATURED}
          isActive={articlesDisplayMode === ArticlesDisplayMode.FEATURED}
          onClick={() => setArticlesDisplayMode(ArticlesDisplayMode.FEATURED)}
        />
        <ArticlesDisplayModeButton
          displayMode={ArticlesDisplayMode.LATEST}
          isActive={articlesDisplayMode === ArticlesDisplayMode.LATEST}
          onClick={() => setArticlesDisplayMode(ArticlesDisplayMode.LATEST)}
        />
      </div>
      <h1 className="active-search-query">
        {!searchTerm ? (
          'News'
        ) : noArticlesFound ? (
          <>
            Sorry, no articles found for{' '}
            <span className="highlight">"{searchTerm}"</span>
          </>
        ) : props.category !== ArticleCategory.FAVORITES &&
          featuredArticlesProvidedFromLatestArticles ? (
          <>
            No articles found in this category. Showing all results for{' '}
            <span className="highlight">"{searchTerm}"</span>
          </>
        ) : (
          <>
            Search results for <span className="highlight">"{searchTerm}"</span>
          </>
        )}
      </h1>
      <ul
        className={classNames('articles-list', {
          featured: articlesDisplayMode === ArticlesDisplayMode.FEATURED,
          latest: articlesDisplayMode === ArticlesDisplayMode.LATEST,
          empty: noArticlesFound,
        })}
      >
        {articlesDisplayedWithCards.map((article, index) => (
          <ArticleCard
            key={article.url}
            article={article}
            isBreakingNews={
              index === 1 && props.category !== ArticleCategory.FAVORITES
            } // this is just for demo purposes
            isSponsored={
              index === 6 && props.category !== ArticleCategory.FAVORITES
            } // this is just for demo purposes
          />
        ))}
        {props.category !== ArticleCategory.FAVORITES && (
          <LatestArticlesWidget key="latest" />
        )}
      </ul>
      {noArticlesFound && <EmptyIcon className="no-articles-icon" />}
    </div>
  )
}
