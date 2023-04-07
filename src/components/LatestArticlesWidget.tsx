import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ArrowRightIcon, handleKeyboardEvent, TimeFormatter } from '../util'
import { useLatestArticles } from '../hooks'

export function LatestArticlesWidget() {
  const navigate = useNavigate()

  const { latestArticles, hasMore, loadMore } = useLatestArticles()

  return (
    <li className="latest-widget">
      <div className="latest-widget-header">
        <div className="radio-indicator" />
        Latest news
      </div>
      <InfiniteScroll
        dataLength={latestArticles.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<></>}
        endMessage={<></>}
        scrollableTarget="latest-widget-list"
      >
        <ul className="latest-widget-list" id="latest-widget-list">
          {latestArticles.map((article) => (
            <li
              className="latest-widget-article"
              title={article.title}
              key={article.url}
            >
              <span className="latest-widget-article__time">
                {TimeFormatter.HOUR_MINUTES.format(
                  new Date(article.publishedAt)
                )}
              </span>
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="latest-widget-article__title"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
      <div className="latest-widget-footer">
        <span
          className="latest-widget-footer__link tab-focus"
          tabIndex={0}
          onClick={() => navigate('/')}
          onKeyDown={(e) => handleKeyboardEvent(e, () => navigate('/'))}
        >
          See all news
          <ArrowRightIcon />
        </span>
      </div>
    </li>
  )
}
