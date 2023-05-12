import React, { createContext, useEffect, useMemo, useState } from 'react'
import { useContext } from 'react'

interface UiConfigContext {
  googleKey: string
}

export const uiConfigContext = createContext<UiConfigContext>(
  {} as UiConfigContext,
)

export const UiConfigProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true)
  const [googleKey, setGoogleKey] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch('/api/uiconfig/')
      .then((res) => res.json())
      .then((data) => {
        if (data.GOOGLE_PLACES_API_KEY) {
          setGoogleKey(data.GOOGLE_PLACES_API_KEY)
          setLoading(false)
        }
      })
  }, [])

  const value = useMemo(() => ({ googleKey }), [googleKey])
  return (
    <uiConfigContext.Provider value={value}>
      {/* {loading ? 'some icon here for loading' : children} */}
      {children}
    </uiConfigContext.Provider>
  )
}

export const useUiConfigProvider = () => {
  return useContext(uiConfigContext)
}
