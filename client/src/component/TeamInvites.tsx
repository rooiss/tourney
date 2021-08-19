import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TeamInvitesAppBar } from './TeamInvitesAppBar'
import { TeamInvite, TeamInviteStatus } from '../types/team'
import { useTournament } from './providers/TournamentContext'
import { PendingInvite } from './PendingInvite'
import { RejectedInvite } from './RejectedInvite'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      minWidth: '33%',
      marginTop: theme.spacing(5),
    },
  }),
  { name: 'TeamInvites' },
)

export const TeamInvites = () => {
  const classes = useStyles()

  const { tournament } = useTournament()

  const [invites, setInvites] = useState<TeamInvite[]>([])

  useEffect(() => {
    fetch(`/api/tournaments/${tournament.id}/invites`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInvites(data.teamInvites)
          return
        }
        // have an error state, setError here
        console.error('an error occurred getting invites')
      })
  }, [tournament?.id])

  return (
    <div className={classes.root}>
      <TeamInvitesAppBar />
      {invites &&
        invites.map((invite) => {
          switch (invite.status) {
            case TeamInviteStatus.PENDING: {
              return <PendingInvite invite={invite} />
            }
            case TeamInviteStatus.REJECTED: {
              return <RejectedInvite invite={invite} />
            }
            default: {
              return null
            }
          }
        })}
    </div>
  )
}
