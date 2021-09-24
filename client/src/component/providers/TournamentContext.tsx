import { useCallback } from 'react'
import { useMemo, createContext, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { TeamInvite, Team } from '../../types/team'
import { useAuth } from './AuthContext'

export interface ITournamentContext {
  tournament: any
  invites: TeamInvite[]
  updateInvite: (invite: TeamInvite) => void
  fetchAllTeams: () => void
  team: Team | null
  allTeams: Team[] | null
  acceptTeamInvite: ({ teamInviteId }: { teamInviteId: string }) => void
  rejectTeamInvite: ({ teamInviteId }: { teamInviteId: string }) => void
  refetchTournament: () => void
  refetchTournamentInvites: () => void
}

export const TournamentContext = createContext<ITournamentContext>(
  {} as ITournamentContext,
)

export const TournamentProvider = ({ children }: any) => {
  const [tournament, setTournament] = useState({})
  const [loading, setLoading] = useState(true)
  const [invites, setInvites] = useState<TeamInvite[]>([])
  const [team, setTeam] = useState<Team | null>(null)
  const [allTeams, setAllTeams] = useState<Team[] | null>(null)

  const { tournamentId } = useParams<{ tournamentId: string }>()

  const { user } = useAuth()

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

  const fetchAllTeams = useCallback(() => {
    fetch(`/api/tournaments/${tournamentId}/teams`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllTeams(data.allTeams)
          const currentTeam = data.allTeams.find((team: Team) =>
            team.teamUsers.some(
              (teammate) => teammate.username === user?.username,
            ),
          )
          setTeam(currentTeam)
          return data
        }
      })
  }, [tournamentId, user])

  const rejectTeamInvite = useCallback(
    ({ teamInviteId }) => {
      return fetch(`/api/tournaments/${tournamentId}/${teamInviteId}/reject`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ teamInviteId }),
      }).then((res) => res.json())
    },
    [tournamentId],
  )

  const acceptTeamInvite = useCallback(
    ({ teamInviteId }) => {
      return fetch(`/api/tournaments/${tournamentId}/${teamInviteId}/accept`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ teamInviteId }),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.success) {
            fetchAllTeams()
          }
        })
    },
    [tournamentId, fetchAllTeams],
  )

  const refetchTournament = useCallback(async () => {
    return fetch(`/api/tournaments/${tournamentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTournament(data.tournament)
          return
        }
        console.log('error in refetchTournament TournamentProvider')
      })
  }, [tournamentId])

  const refetchTournamentInvites = useCallback(async () => {
    return fetch(`/api/tournaments/${tournamentId}/invites`)
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
    fetchAllTeams()
  }, [tournamentId, user, fetchAllTeams])

  const value: ITournamentContext = useMemo(
    () => ({
      tournament,
      invites,
      updateInvite,
      fetchAllTeams,
      acceptTeamInvite,
      rejectTeamInvite,
      team,
      allTeams,
      refetchTournament,
      refetchTournamentInvites,
    }),
    [
      tournament,
      updateInvite,
      invites,
      allTeams,
      team,
      fetchAllTeams,
      acceptTeamInvite,
      rejectTeamInvite,
      refetchTournament,
      refetchTournamentInvites,
    ],
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
