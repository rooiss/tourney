import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}))

export const Landing = () => {
  const classes = useStyles()
  return (
    <div className={classes.paper}>
      <h1>Sign up. Check in. Start playing.</h1>
      <Button
        className={classes.submit}
        variant="contained"
        color="primary"
        component={Link}
        to="/signup"
      >
        Sign up
      </Button>
      <Button
        className={classes.submit}
        variant="contained"
        color="primary"
        component={Link}
        to="/login"
      >
        Login
      </Button>
    </div>
  )
}
