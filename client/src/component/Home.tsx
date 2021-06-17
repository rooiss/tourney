import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './providers/AuthContext'

import { Landing } from './Landing'
import Search from './Search'
import { Tournaments } from './Tournaments'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const Home = () => {
  const classes = useStyles()
  const { user } = useAuth()

  return (
    <Container component="main" maxWidth="xs">
      {user ? (
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add your league, team, and players
          </Typography>
          <Search />
          <Tournaments />
          <Button
            component={Link}
            to={'/newTournament'}
            color={'primary'}
            variant={'contained'}
            className={classes.submit}
          >
            Create Tournament
          </Button>
        </div>
      ) : (
        <Landing />
      )}
    </Container>
  )
}
