import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useEffect } from 'react'
import { Following } from '../../types/follows'
import { useAuth } from './AuthContext'

export interface FollowingProviderProps {}

export interface FollowingContext {
  refetch: () => void
  following: Following[]
  setFollowing: (Following: Following[]) => void
}

export const followingContext = createContext<FollowingContext>(
  {} as FollowingContext,
)

export const FollowingProvider = ({ children }: { children: ReactNode }) => {
  const [following, setFollowing] = useState<Following[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()

  const fetchFollowers = useCallback(() => {
    setLoading(true)
    return fetch(`/api/follows`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFollowing(data.followedUsers)
          return data
        }
        setError(data.error)
        return data
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const refetch = useCallback(async () => {
    return fetchFollowers().then((data) => {
      if (data.success === true) {
        setFollowing(data.followedUsers)
        return
      }
      console.log('error in refetch on FollowingProvider')
      return
    })
  }, [fetchFollowers])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }
    fetchFollowers()
  }, [fetchFollowers, isAuthenticated])

  const value: FollowingContext = useMemo(
    () => ({
      refetch,
      following,
      setFollowing,
    }),

    [refetch, following, setFollowing],
  )
  return (
    <followingContext.Provider value={value}>
      {children}
    </followingContext.Provider>
  )
}

export const useFollowing = () => useContext(followingContext)
