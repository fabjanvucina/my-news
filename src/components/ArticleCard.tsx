import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Article } from '../types'
import {
  addArticleToBookmarks,
  BookmarkFillIcon,
  BookmarkOutlineIcon,
  handleKeyboardEvent,
  isArticleBookmarked,
  removeArticleFromBookmarks,
} from '../util'

const DEFAULT_IMAGE_URL = '/img/default-article-image.svg'

type Props = {
  article: Article
  isBreakingNews?: boolean
  isSponsored?: boolean
}

export function ArticleCard(props: Props) {
  //TODO: this could be refactored to use a custom hook
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    async function checkIfBookmarked() {
      const isFavorite = await isArticleBookmarked(props.article)
      setIsBookmarked(isFavorite)
    }

    checkIfBookmarked()

    return () => {
      setIsBookmarked(false)
    }
  }, [props.article])

  async function handleAddBookmark() {
    await addArticleToBookmarks(props.article)
    setIsBookmarked(true)
  }

  async function handleRemoveBookmark() {
    await removeArticleFromBookmarks(props.article)
    setIsBookmarked(false)
  }

  return (
    <li
      className={classNames('article-card tab-focus', {
        breaking: props.isBreakingNews,
        sponsored: props.isSponsored,
      })}
      tabIndex={0}
      onClick={() => window.open(props.article.url, '_blank')}
      onKeyDown={(e) =>
        handleKeyboardEvent(e, () => window.open(props.article.url, '_blank'))
      }
      title={props.article.title}
    >
      <img
        src={props.article.urlToImage || DEFAULT_IMAGE_URL}
        alt={props.article.title}
        className="article-card__image"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = DEFAULT_IMAGE_URL
        }}
      />
      <div className="article-card__text-content">
        {props.isBreakingNews && (
          <span className="breaking-news-banner">Breaking</span>
        )}
        <span className="article-card-title truncate">
          {props.article.title}
        </span>
        <span className="article-card-author truncate">
          {props.article.author || props.article.source.name}
        </span>
      </div>
      {isBookmarked ? (
        <BookmarkFillIcon
          className="bookmark-icon active tab-focus"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveBookmark()
          }}
          onKeyDown={(e) => handleKeyboardEvent(e, handleRemoveBookmark)}
        />
      ) : (
        <BookmarkOutlineIcon
          className="bookmark-icon tab-focus"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            handleAddBookmark()
          }}
          onKeyDown={(e) => handleKeyboardEvent(e, handleAddBookmark)}
        />
      )}
      {props.isSponsored && <div className="sponsored-disclaimer">AD</div>}
    </li>
  )
}
