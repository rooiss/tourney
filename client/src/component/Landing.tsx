import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundImage: 'url(/vballpic.jpeg)',
    backgroundRepeat: 'none',
    backgroundSize: 'cover',
    minHeight: '400px',
    backgroundPosition: '50% 60%',
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  title: {
    color: 'black',
  },
  callCard: {
    backgroundColor: 'rgba(255, 255, 255,0.87)',
    marginLeft: '20%',
    padding: '20px',
    margin: '20px 0px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: '300px',
  },
}))

export const Landing = () => {
  const classes = useStyles()
  return (
    <div className={classes.paper}>
      <div className={classes.callCard}>
        <h1 className={classes.title}>
          Sign up. <br />
          Check in. <br />
          Start playing.
        </h1>
        <div>
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
            variant="text"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  )
}
