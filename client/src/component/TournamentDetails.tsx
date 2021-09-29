import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useTournament } from './providers/TournamentContext'
import EventIcon from '@material-ui/icons/Event'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Map } from './Map'
import { formatDate } from './Tournaments'

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  title: {
    marginRight: theme.spacing(1),
  },
  map: {
    marginTop: theme.spacing(3),
  },
}))

export const TournamentDetails = () => {
  const classes = useStyles()

  const { tournament } = useTournament()

  return (
    <div className={classes.paper}>
      <Typography variant="h3" className={classes.titleContainer}>
        <span className={classes.title}>Volleyball tournament</span>
      </Typography>
      <Typography variant="h5" className={classes.titleContainer}>
        <span className={classes.title}>
          <LocationOnIcon /> {tournament.location.address}
        </span>
      </Typography>
      <Typography variant="h4" className={classes.titleContainer}>
        <span className={classes.title}>
          <EventIcon /> {formatDate(tournament.selectedDate)}
        </span>
      </Typography>
      <Map tourneyLocation={tournament.location} />
    </div>
  )
}
