import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Button, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTournament } from './providers/TournamentContext'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      borderRadius: '4px',
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
    },
  }),
  { name: 'TeamInvitesAppBar' },
)

export const TeamInvitesAppBar = () => {
  const classes = useStyles()

  const { tournament } = useTournament()

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Team Invites
        </Typography>
        <Button
          component={Link}
          to={`/tournaments/${tournament.id}/createTeam`}
          color={'secondary'}
          variant={'contained'}
        >
          Create team
        </Button>
      </Toolbar>
    </AppBar>
  )
}
