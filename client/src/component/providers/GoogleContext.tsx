import React, { createContext, useMemo } from 'react'
import { useContext } from 'react'
import { useLoadScript } from '@react-google-maps/api'

interface GoogleContext {
  isLoaded: boolean
  loadError?: Error
}

export const googleContext = createContext<GoogleContext>({
  isLoaded: false,
})

const libraries = ['places' as const]

export const GoogleProvider = ({ children }: any) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY || '',
    libraries,
  })
  const value = useMemo(() => ({ isLoaded, loadError }), [isLoaded, loadError])
  return (
    <googleContext.Provider value={value}>
      {isLoaded ? children : 'some icon here for loading'}
    </googleContext.Provider>
  )
}

export const useGoogleProvider = () => {
  return useContext(googleContext)
}
