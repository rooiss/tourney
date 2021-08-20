import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import { rejectTeamInvite } from '../api/rejectTeamInvite'
import { acceptTeamInvite } from '../api/acceptTeamInvite'
import { useTournament } from './providers/TournamentContext'
import { TeamInvite } from '../types/team'
import { useAuth } from './providers/AuthContext'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
  { name: 'PendingInvite' },
)

export interface PendingInviteProps {
  invite: TeamInvite
}

export const PendingInvite = ({ invite }: PendingInviteProps) => {
  const classes = useStyles()
  const { tournament } = useTournament()
  const { user } = useAuth()
  return (
    <Card variant="outlined" className={classes.root} key={invite.id}>
      <CardContent>
        <Typography variant="h6">Team {invite.teamName}</Typography>
        <Typography variant="subtitle2">
          invited you to be on their team
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() =>
            acceptTeamInvite({
              teamInviteId: invite.id,
              tournamentId: tournament.id,
              teamName: invite.teamName,
              currentUser: user,
            })
          }
        >
          Accept
        </Button>
        <Button
          size="small"
          variant="text"
          onClick={() =>
            rejectTeamInvite({
              teamInviteId: invite.id,
              tournamentId: tournament.id,
            })
          }
        >
          No Thanks
        </Button>
      </CardActions>
    </Card>
  )
}
