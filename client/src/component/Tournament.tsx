import React from 'react'
import { makeStyles } from '@material-ui/core'
import { TournamentDetails } from './TournamentDetails'
import { TeamInvites } from './TeamInvites'
import { TeamBreadcrumbs } from './TeamBreadcrumbs'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    marginTop: theme.spacing(4),
    alignItems: 'center',
  },
  innerPaper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}))

export const Tournament = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <TeamBreadcrumbs />
        <div className={classes.innerPaper}>
          <TournamentDetails />
          <TeamInvites />
        </div>
      </div>
    </div>
  )
}
