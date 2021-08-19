import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { rejectTeamInvite } from '../api/rejectTeamInvite'
import { acceptTeamInvite } from '../api/acceptTeamInvite'
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
  const { tournament } = useTournament()
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
          component={Link}
          to={`/tournaments/${tournament.id}/createTeam`}
          size="small"
          color="primary"
          variant="contained"
          onClick={acceptTeamInvite}
        >
          Accept
        </Button>
        <Button
          // component={Link}
          // to={`/tournaments/${tournament.id}/createTeam`}
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
