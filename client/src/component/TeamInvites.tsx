import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TeamInvitesAppBar } from './TeamInvitesAppBar'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTournament } from './providers/TournamentContext'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      minWidth: '33%',
      marginTop: theme.spacing(5),
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
  { name: 'TeamInvites' },
)

export const TeamInvites = () => {
  const classes = useStyles()

  const { tournament } = useTournament()

  // const [invites, setInvites] = useState([])

  // useEffect(() => {
  //   fetch('/api/teamInvites')
  //   .then(res => res.json())
  //   .then(data => setInvites(data.invites))
  // }, [])

  // const allInvites = invites.map() => {
  // }
  return (
    <div className={classes.root}>
      <TeamInvitesAppBar />
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">Louis K</Typography>
          <span>
            <Typography>invited you to be on their team</Typography>
          </span>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/tournaments/${tournament.id}/createTeam`}
            size="small"
            color={'primary'}
            variant={'contained'}
          >
            Accept
          </Button>
        </CardActions>
      </Card>
      {/* {allInvites} */}
    </div>
  )
}
