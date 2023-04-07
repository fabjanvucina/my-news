import { createContext } from 'react'

export interface SearchContextInterface {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

export const SearchContext = createContext<SearchContextInterface | undefined>(
  undefined
)
