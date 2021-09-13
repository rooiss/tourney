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
  setFollowing: (Following: Following[]) => void
}

export const followingContext = createContext<FollowingContext>(
  {} as FollowingContext,
)

async function fetchFollowers() {
  return fetch('/api/follows').then((res) => res.json())
}

export const FollowingProvider = ({ children }: { children: ReactNode }) => {
  const [following, setFollowing] = useState<Following[]>([])
  // const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    return (
      fetchFollowers()
        // .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setFollowing(data.followedUsers)
            return
          }
          console.log('error in refetch on FollowingProvider')
          return
        })
    )
  }, [])

  useEffect(() => {
    fetchFollowers().then((res) => {
      if (res.success === true) {
        setFollowing(res.followedUsers)
        return
      }
      console.log('error in useEffect on FollowingProvider')
    })
  }, [])

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
