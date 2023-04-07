import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Page } from './components'
import { ArticleCategory } from './enums'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path={''}
            element={<Page category={ArticleCategory.GENERAL} />}
          />
          <Route
            path={`/${ArticleCategory.BUSINESS}`}
            element={<Page category={ArticleCategory.BUSINESS} />}
          />
          <Route
            path={`/${ArticleCategory.HEALTH}`}
            element={<Page category={ArticleCategory.HEALTH} />}
          />
          <Route
            path={`/${ArticleCategory.SCIENCE}`}
            element={<Page category={ArticleCategory.SCIENCE} />}
          />
          <Route
            path={`/${ArticleCategory.SPORTS}`}
            element={<Page category={ArticleCategory.SPORTS} />}
          />
          <Route
            path={`/${ArticleCategory.TECHNOLOGY}`}
            element={<Page category={ArticleCategory.TECHNOLOGY} />}
          />
          <Route
            path={`/${ArticleCategory.FAVORITES}`}
            element={<Page category={ArticleCategory.FAVORITES} />}
          />
          <Route
            path="*"
            element={
              <>TODO: Not found</>
            } /*TODO: implement this page when we have the design */
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
