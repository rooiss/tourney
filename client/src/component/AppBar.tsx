import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { logout } from '../api/logout'
import { useAuth } from './providers/AuthContext'
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'flex',
      textDecoration: 'none',
      alignItems: 'center',
      color: '#495056',
      marginLeft: theme.spacing(12),
    },
    titleWord: {
      marginLeft: theme.spacing(1),
      fontWeight: 500,
      fontSize: '18px',
    },
    appBar: {
      backgroundColor: '#FFFFFF',
    },
    loginButtons: {
      marginRight: theme.spacing(12),
    },
    loginButton: {
      textTransform: 'none',
      borderRadius: '27px',
      fontSize: '18px',
      fontWeight: 'bold',
      border: 'solid 2px',
      height: '46px',
    },
  }),
)

export const ButtonAppBar = () => {
  const classes = useStyles()

  const handleLogout = () => {
    logout().then(
      () => {
        window.location.href = '/'
      },
      () => {
        console.log('logout failed')
      },
    )
  }

  const { user } = useAuth()
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to={'/'} className={classes.title}>
            <SportsVolleyballIcon color={'primary'} fontSize={'large'} />
            <Typography className={classes.titleWord}>
              Volleyball Tournaments
            </Typography>
          </Link>
          <div className={classes.loginButtons}>
            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button
                color="primary"
                component={Link}
                to="/login"
                variant="outlined"
                className={classes.loginButton}
                size="large"
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
