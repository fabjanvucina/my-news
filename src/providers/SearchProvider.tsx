import { useMemo, useState } from 'react'
import { SearchContext, SearchContextInterface } from '../contexts'

type Props = {
  children: React.ReactNode
}

export function SearchProvider(props: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const contextValue: SearchContextInterface = useMemo(() => {
    return {
      searchTerm,
      setSearchTerm,
    }
  }, [searchTerm])

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  )
}
