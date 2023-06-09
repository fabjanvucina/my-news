import { useEffect, useState } from 'react'
import { useAppLoading, useSearch } from '../hooks'
import { Button } from './Button'

type Props = {
  onSubmit?: () => void
}

export function SearchBar(props: Props) {
  const [value, setValue] = useState('')

  const { appLoading } = useAppLoading()
  const { searchTerm, setSearchTerm } = useSearch()

  useEffect(() => {
    setValue(searchTerm)
  }, [searchTerm])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSearchTerm(value)
    props.onSubmit?.()
  }

  const prod = process.env.NODE_ENV === 'production'

  return (
    <form onSubmit={handleSubmit} className="search-wrapper">
      <input
        type="search"
        className="search-input"
        value={value}
        placeholder={
          prod
            ? 'Searching is not available due to API restrictions.'
            : 'Search news'
        }
        spellCheck={false}
        disabled={prod}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="primary"
        className="search-button"
        submit={true}
        disabled={value === searchTerm || appLoading}
      >
        Search
      </Button>
    </form>
  )
}
