import React from 'react'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react'
import TournamentAppBar from './TournamentAppBar'
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
      .then((data) => setTournaments(data.tournaments))
  }, [tournaments])

  // display username, date of tournament, location,

  const classes = useStyles()

  const allTournaments = tournaments.map((tournament: any) => {
    return (
      <Card className={classes.root} variant="outlined" key={tournament.id}>
        <CardContent className={classes.card}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {tournament.location}
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
            Register
          </Button>
        </CardActions>
      </Card>
    )
  })
  return (
    <div>
      <TournamentAppBar />
      {allTournaments}
    </div>
  )
}
