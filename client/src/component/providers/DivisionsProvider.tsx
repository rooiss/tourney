import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Division } from '../../types/division'

export interface DivisionsContext {
  divisions: Division[]
  loading: boolean
  error: string
}

export const divisionsContext = createContext<DivisionsContext>(
  {} as DivisionsContext,
)

export const DivisionsProvider = ({ children }: { children: ReactNode }) => {
  const [divisions, setDivisions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDivisions = useCallback(() => {
    setLoading(true)
    return fetch(`/api/divisions`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDivisions(data.divisions)
          return data
        }
        setError(data.error)
        return data
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchDivisions()
  }, [fetchDivisions])

  const value: DivisionsContext = useMemo(
    () => ({
      divisions,
      loading,
      error,
    }),
    [divisions, loading, error],
  )

  return (
    <divisionsContext.Provider value={value}>
      {children}
    </divisionsContext.Provider>
  )
}

export const useDivisions = () => useContext(divisionsContext)
