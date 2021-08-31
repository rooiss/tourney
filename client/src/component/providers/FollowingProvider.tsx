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

export interface FollowingProviderProps {}

export interface FollowingContext {
  refetch: () => void
  following: Following[]
  setFollowing: React.Dispatch<React.SetStateAction<any>>
}

export const followingContext = createContext<FollowingContext>(
  {} as FollowingContext,
)

export const FollowingProvider = ({ children }: { children: ReactNode }) => {
  const [following, setFollowing] = useState<Following[]>([])
  // const [loading, setLoading] = useState(true)

  const refetch = useCallback(() => {
    fetch('/api/follows/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFollowing(data.followedUsers)
          return
        }
      })
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

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
