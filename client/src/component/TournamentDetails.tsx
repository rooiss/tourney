import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useTournament } from './providers/TournamentContext'
import EventIcon from '@material-ui/icons/Event'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Map } from './Map'

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
}))

export const TournamentDetails = () => {
  const classes = useStyles()

  const { tournament } = useTournament()

  return (
    <div className={classes.paper}>
      <Typography variant="h3" className={classes.titleContainer}>
        <span className={classes.title}>
          Volleyboo tournament{/*{tournament.selectedDate} */}
        </span>
      </Typography>
      <Typography variant="h4" className={classes.titleContainer}>
        <span className={classes.title}>
          <EventIcon /> August 12 2021 {/*{tournament.selectedDate} */}
        </span>
      </Typography>
      <Typography variant="h5" className={classes.titleContainer}>
        <span className={classes.title}>
          <LocationOnIcon /> {tournament.location}
        </span>
      </Typography>
      <Map />
    </div>
  )
}
