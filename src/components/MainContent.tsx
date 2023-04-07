import { ArticleCategory } from '../enums'
import { useAppLoading } from '../hooks'
import { Articles } from './Articles'
import { Navigation } from './Navigation'
import { Spinner } from './Spinner'

type Props = {
  category: ArticleCategory
}

export function MainContent(props: Props) {
  const { appLoading } = useAppLoading()

  return (
    <main>
      {appLoading ? (
        <Spinner />
      ) : (
        <>
          <Navigation />
          <Articles category={props.category} />
        </>
      )}
    </main>
  )
}
