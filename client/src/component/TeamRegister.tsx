import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TeamBreadcrumbs } from './TeamBreadcrumbs'
import { Button, TextField, Typography } from '@material-ui/core'
import { useTournament } from './providers/TournamentContext'
import { AuthUser, useAuth } from './providers/AuthContext'
import { TeammateSearch } from './TeammateSearch'
import { Teammates } from './Teammates'
import { Teammate } from '../types/team'
import { createTeam } from '../api/createTeam'

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

const userToTeammate = (user: AuthUser): Teammate => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastNameLetter: user.lastName[0],
    id: user.id,
  }
}

export const TeamRegister = () => {
  const { tournament } = useTournament()
  const { user } = useAuth()

  const [teammates, setTeammates] = useState([userToTeammate(user!!)])
  const [teamNameError, setTeamNameError] = useState(false)
  const [captain, setCaptain] = useState(user!!.id)

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
    createTeam({ tournamentId: tournament.id, teammates, captain })
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
        <Teammates
          teammates={teammates}
          captain={captain}
          setCaptain={setCaptain}
          setTeammates={setTeammates}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Send out invites
        </Button>
      </form>
    </div>
  )
}
