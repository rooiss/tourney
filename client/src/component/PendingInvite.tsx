import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import { useTournament } from './providers/TournamentContext'
import { TeamInvite } from '../types/team'

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
  const { acceptTeamInvite, rejectTeamInvite } = useTournament()

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
            })
          }
        >
          No Thanks
        </Button>
      </CardActions>
    </Card>
  )
}
