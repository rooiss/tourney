import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TeamBreadcrumbs } from './TeamBreadcrumbs'
import { Button, TextField, Typography } from '@material-ui/core'
import { useTournament } from './providers/TournamentContext'
import { useAuth } from './providers/AuthContext'
import { TeammateSearch } from './TeammateSearch'
import { Teammates } from './Teammates'

const useStyles = makeStyles(
  (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    serverErrorMsg: {
      width: '100%',
      marginTop: theme.spacing(2),
    },
    teamNameField: {
      width: '100%',
    },
  }),
  { name: 'TeamRegister' },
)

export const TeamRegister = () => {
  const { tournament } = useTournament()
  const { user } = useAuth()

  const [teammates, setTeammates] = useState([user])
  const [teamNameError, setTeamNameError] = useState(false)

  const classes = useStyles()

  const handleSubmit = (e) => {
    console.log('e', e)
  }

  const handleChange = (e) => {
    const teamName = e.target.value
    const tournamentId = tournament.id
    fetch(`/api/validate/${tournamentId}/teamname`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ teamName }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
  return (
    <div className={classes.paper}>
      <TeamBreadcrumbs />
      <Typography variant="h3">Assemble your squad</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        {/* <TextField
          name="teamName"
          variant="outlined"
          required
          fullWidth
          id="teamName"
          label="Team Name"
          value={values.teamName}
          onChange={handleChange}
          helperText={touched.teamName && errors.teamName}
          autoFocus
        /> */}
        <TextField
          // helperText=""
          name="teamName"
          id="teamName"
          className={classes.teamNameField}
          label="Team Name"
          variant="outlined"
          error={teamNameError}
          onChange={handleChange}
          autoFocus
        />
        <TeammateSearch
          tournamentId={tournament.id}
          teammates={teammates}
          setTeammates={setTeammates}
        />
        <Teammates teammates={teammates} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
      </form>
    </div>
  )
}
