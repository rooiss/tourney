import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TournamentsAppBar from './TournamentsAppBar'
import { Link } from 'react-router-dom'
import { useTournaments } from './providers/TournamentsProvider'

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    textAlign: 'left',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export const Tournaments = () => {
  const { tournaments } = useTournaments()

  const formatDate = (date) => {
    const newDate = date.split('T')[0].split('-')
    return `${newDate[1]}/${newDate[2]}/${newDate[0]}`
  }

  const classes = useStyles()
  const allTournaments = tournaments.map((tournament: any) => {
    return (
      <Card className={classes.root} variant="outlined" key={tournament.id}>
        <CardContent className={classes.card}>
          <Typography variant="h3" component="h2">
            {/* put tournament creator here */}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {tournament.location.address}
          </Typography>
          <Typography variant="h5" component="h2">
            {formatDate(tournament.selectedDate)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/tournaments/${tournament.id}`}
            size="small"
          >
            View
          </Button>
        </CardActions>
      </Card>
    )
  })
  return (
    <div>
      <TournamentsAppBar />
      {allTournaments}
    </div>
  )
}
