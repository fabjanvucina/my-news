import { ArticleCategory } from '../enums'
import {
  AppLoadingProvider,
  BookmarkedArticlesProvider,
  FeaturedArticlesProvider,
  LatestArticlesProvider,
  SearchProvider,
} from '../providers'
import { Banner } from './Banner'
import { Footer } from './Footer'
import { Header } from './Header'
import { MainContent } from './MainContent'

type Props = {
  category: ArticleCategory
}

export function Page(props: Props) {
  return (
    <SearchProvider>
      <BookmarkedArticlesProvider category={props.category}>
        <LatestArticlesProvider>
          <FeaturedArticlesProvider category={props.category}>
            <AppLoadingProvider>
              <Banner />
              <Header />
              <MainContent category={props.category} />
              <Footer />
            </AppLoadingProvider>
          </FeaturedArticlesProvider>
        </LatestArticlesProvider>
      </BookmarkedArticlesProvider>
    </SearchProvider>
  )
}
