import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './providers/AuthContext'
import { Landing } from './Landing'
import { Dashboard } from './Dashboard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

export const Home = () => {
  const classes = useStyles()
  const { user } = useAuth()

  return (
    <div className={classes.root}>{user ? <Dashboard /> : <Landing />}</div>
  )
}
