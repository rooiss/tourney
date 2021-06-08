import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './AuthContext'

import { Landing } from './Landing'
import Search from './Search'

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
          <Typography component="h1" variant="h6">
            {user?.username}
          </Typography>
          <Typography component="h1" variant="h5">
            Add your league, team, and players
          </Typography>
          <Search />
          <Button
            component={Link}
            to={'/newtournament'}
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
