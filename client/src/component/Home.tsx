import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './providers/AuthContext'
import Grid from '@material-ui/core/Grid'
import { Landing } from './Landing'
import { Tournaments } from './Tournaments'
import { Following } from './Following'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
    textAlign: 'center',
  },
}))

export const Home = () => {
  const classes = useStyles()
  const { user } = useAuth()

  return (
    <div className={classes.root}>
      {user ? (
        <Grid container spacing={3}>
          <Grid item xs={7} className={classes.grid}>
            <Tournaments />
          </Grid>
          <Grid item xs={4} className={classes.grid}>
            <Following />
          </Grid>
        </Grid>
      ) : (
        <Landing />
      )}
    </div>
  )
}
