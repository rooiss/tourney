import React from 'react'
import { Tournaments } from './Tournaments'
import { Following } from './Following'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './providers/AuthContext'
import { VerifyMessage } from './VerifyMessage'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    grid: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(4),
      textAlign: 'center',
    },
  }),
  { name: 'Dashboard' },
)

export const Dashboard = () => {
  const classes = useStyles()
  const auth = useAuth()
  const user = auth.user!!

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.grid}>
          {!user.verified && <VerifyMessage />}
        </Grid>
        <Grid item xs={8} className={classes.grid}>
          <Tournaments />
        </Grid>
        <Grid item xs={4} className={classes.grid}>
          <Following />
        </Grid>
      </Grid>
    </div>
  )
}
