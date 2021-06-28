import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useTournament } from './providers/TournamentContext'
import { TeamRegister } from './TeamRegister'

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginRight: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const TournamentDetails = () => {
  const classes = useStyles()

  // this is pulling the state from the context
  const { tournament } = useTournament()

  // if the creator of the tournament is viewing, edit button should be available

  return (
    <div className={classes.paper}>
      <Typography variant="h4" className={classes.titleContainer}>
        <span className={classes.title}>{tournament.selectedDate}</span>
      </Typography>
      <Typography variant="h5" className={classes.titleContainer}>
        <span className={classes.title}>{tournament.location}</span>
      </Typography>
      <TeamRegister />
    </div>
  )
}
