import { useCallback } from 'react'
import { useMemo, createContext, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { TeamInvite } from '../../types/team'

export interface ITournamentContext {
  tournament: any
  invites: TeamInvite[]
  updateInvite: (invite: TeamInvite) => void
}

export const TournamentContext = createContext<ITournamentContext>(
  {} as ITournamentContext,
)

export const TournamentProvider = ({ children }: any) => {
  const [tournament, setTournament] = useState({})
  const [loading, setLoading] = useState(true)
  const [invites, setInvites] = useState<TeamInvite[]>([])
  // const [state, setState] = useState<ITournamentContext>()
  // const [error, setError] = useState('')
  const { tournamentId } = useParams<{ tournamentId: string }>()

  useEffect(() => {
    setLoading(true)
    // fetch the tournament object
    fetch(`/api/tournaments/${tournamentId}`)
      .then((res) => res.json())
      .then((data) => {
        setTournament(data.tournament)
      })
      .finally(() => setLoading(false))

    // also fetch invites for this user
    fetch(`/api/tournaments/${tournamentId}/invites`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInvites(data.teamInvites)
          return
        }
        // have an error state, setError here
        console.error('an error occurred getting invites')
      })
  }, [tournamentId])

  const updateInvite = useCallback(
    (invite: TeamInvite) => {
      const updatedInvites = invites.map((i) => {
        if (i.id === invite.id) {
          return invite
        }
        return i
      })
      setInvites(updatedInvites)
    },
    [invites],
  )

  const value: ITournamentContext = useMemo(
    () => ({
      tournament,
      invites,
      updateInvite,
    }),
    [tournament, updateInvite, invites],
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
