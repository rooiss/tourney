import { useMemo, createContext, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'

export interface ITournamentContext {
  tournament: any
}

export const TournamentContext = createContext<ITournamentContext>(
  {} as ITournamentContext,
)

export const TournamentProvider = ({ children }: any) => {
  const [tournament, setTournament] = useState({})
  const [loading, setLoading] = useState(true)
  // const [state, setState] = useState<ITournamentContext>()
  // const [error, setError] = useState('')
  const { tournamentId } = useParams<{ tournamentId: string }>()

  useEffect(() => {
    setLoading(true)
    fetch(`/api/tournaments/${tournamentId}`)
      .then((res) => res.json())
      .then((data) => {
        setTournament(data.tournament)
      })
      .finally(() => setLoading(false))
  }, [tournamentId])

  const value: ITournamentContext = useMemo(
    () => ({
      tournament,
    }),
    [tournament],
  )
  return (
    <TournamentContext.Provider value={value}>
      {!loading && children}
    </TournamentContext.Provider>
  )
}

export const useTournament = () => {
  return useContext(TournamentContext)
}
