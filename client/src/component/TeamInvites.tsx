import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TeamInvitesAppBar } from './TeamInvitesAppBar'
import { TeamInviteStatus } from '../types/team'
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

  const { invites } = useTournament()

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
