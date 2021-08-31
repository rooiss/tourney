import React, { useState } from 'react'
import { Tournaments } from './Tournaments'
import { Following } from './Following'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './providers/AuthContext'
import { VerifyMessage } from './VerifyMessage'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'

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
  const { location } = useHistory()
  const params = new URLSearchParams(location.search)
  const message = params.get('message')
  const [open, setOpen] = useState(true)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {!user.verified && (
          <Grid item xs={12} className={classes.grid}>
            <VerifyMessage />
          </Grid>
        )}
        <Grid item xs={8} className={classes.grid}>
          <Tournaments />
        </Grid>
        <Grid item xs={4} className={classes.grid}>
          <Following />
        </Grid>
      </Grid>
      {message && (
        <Snackbar autoHideDuration={3000} open={open} onClose={handleClose}>
          <Alert severity="success" onClose={handleClose}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}
