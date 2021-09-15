import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useEffect } from 'react'
import { Tournament } from '../../types/tournament'

export interface TournamentsContext {
  refetchTournaments: () => void
  tournaments: Tournament[]
  setTournaments: (Tournament: Tournament[]) => void
}

export const tournamentsContext = createContext<TournamentsContext>(
  {} as TournamentsContext,
)

export const TournamentsProvider = ({ children }: { children: ReactNode }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  // const [loading, setLoading] = useState(true)

  const refetchTournaments = useCallback(async () => {
    return fetch('/api/tournaments/')
      .then((res) => res.json())
      .then((data) => {
        setTournaments(data.tournaments)
      })
  }, [])

  useEffect(() => {
    fetch('/api/tournaments/')
      .then((res) => res.json())
      .then((data) => {
        setTournaments(data.tournaments)
      })
  }, [])

  const value: TournamentsContext = useMemo(
    () => ({
      refetchTournaments,
      tournaments,
      setTournaments,
    }),

    [refetchTournaments, tournaments, setTournaments],
  )
  return (
    <tournamentsContext.Provider value={value}>
      {children}
    </tournamentsContext.Provider>
  )
}

export const useTournaments = () => useContext(tournamentsContext)
