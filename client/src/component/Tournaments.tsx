import React from 'react'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react'
import TournamentsAppBar from './TournamentsAppBar'
import { Link } from 'react-router-dom'

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
  // getting all tournaments from users being followed
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    fetch('/api/tournaments/')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.tournaments)
        setTournaments(data.tournaments)
      })
  }, [])
  // display username, date of tournament, location,

  const classes = useStyles()
  const allTournaments = tournaments.map((tournament: any) => {
    // console.log('tournaments', tournaments)
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
            {tournament.selectedDate}
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
