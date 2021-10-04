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
import { formatDate } from '../utils/formatDate'
import { useAuth } from './providers/AuthContext'

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
  const { tournaments, refetchTournaments } = useTournaments()
  const { user } = useAuth()

  const classes = useStyles()

  const deleteTournament = (tournamentId) => () => {
    fetch(`/api/tournaments/${tournamentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          refetchTournaments()
        }
      })
  }

  const allTournaments = tournaments.map((tournament: any) => {
    return (
      <Card className={classes.root} variant="outlined" key={tournament.id}>
        <CardContent className={classes.card}>
          <Typography variant="h4" component="h2">
            {tournament.creator.username}'s volleyball tournament
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {tournament.tourneyLocation.address}
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
          {tournament.creator.id === user!!.id ? (
            <Button
              // component={Link}
              // to={`/tournaments/${tournament.id}`}
              size="small"
              color="secondary"
              onClick={deleteTournament(tournament.id)}
            >
              Delete
            </Button>
          ) : null}
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
