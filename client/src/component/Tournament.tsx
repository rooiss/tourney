import React from 'react'
import { makeStyles } from '@material-ui/core'
import { TournamentDetails } from './TournamentDetails'
import { TeamInvites } from './TeamInvites'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginRight: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const Tournament = () => {
  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <TournamentDetails />
      <TeamInvites />
    </div>
  )
}
