import { createContext } from 'react'

export interface AppLoadingContextInterface {
  appLoading: boolean
}

export const AppLoadingContext = createContext<
  AppLoadingContextInterface | undefined
>(undefined)
