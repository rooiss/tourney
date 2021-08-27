import { useCallback } from 'react'
import { useMemo, createContext, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { TeamInvite, Team } from '../../types/team'
import { useAuth } from './AuthContext'

export interface ITournamentContext {
  tournament: any
  invites: TeamInvite[]
  updateInvite: (invite: TeamInvite) => void
  // fetchCurrentTeam: (team: Team) => void
  team: Team | null
  allTeams: Team[] | null
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

  // const fetchCurrentTeam = useCallback(() => {
  //   console.log('fetch current team running')
  //   fetch(`/api/tournaments/${tournamentId}/currentTeam`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setTeam(data.team)
  //         return data
  //       }
  //     })
  // }, [tournamentId])

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
    // get all teams
    fetch(`/api/tournaments/${tournamentId}/teams`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllTeams(data.allTeams)
          // console.log('data.allTeams.teamUsers', data.allTeams[0].teamUsers)
          // set the team state to the users team
          const currentTeam = data.allTeams.find((team: Team) =>
            team.teamUsers.some(
              (teammate) => teammate.username === user?.username,
            ),
          )
          setTeam(currentTeam)
          // console.log('currentTeam', currentTeam)
          return data
        }
      })
    // see if user is on a team
    // fetchCurrentTeam()
  }, [tournamentId, user])
  // }, [tournamentId, fetchCurrentTeam])

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
      // fetchCurrentTeam,
      team,
      allTeams,
    }),
    [tournament, updateInvite, invites, allTeams, team],
    // [tournament, updateInvite, invites, fetchCurrentTeam, team],
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
