import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { logout } from '../api/logout'
import { useAuth } from './providers/AuthContext'
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball'

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
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Link to={'/'} className={classes.title}>
            <SportsVolleyballIcon color={'secondary'} fontSize={'large'} />
          </Link>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
