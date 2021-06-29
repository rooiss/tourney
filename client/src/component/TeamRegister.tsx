import React, { useState } from 'react'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import { TeamBreadcrumbs } from './TeamBreadcrumbs'
import { TextField, Typography } from '@material-ui/core'
import { teamNameNotTaken } from '../validations/teamName'
import { useTournament } from './providers/TournamentContext'
import { useAuth } from './providers/AuthContext'
import { TeammateSearch } from './TeammateSearch'

const useStyles = makeStyles(
  (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    serverErrorMsg: {
      width: '100%',
      marginTop: theme.spacing(2),
    },
    progressIcon: {
      marginTop: theme.spacing(2),
    },
  }),
  { name: 'TeamRegister' },
)

const validationSchema = yup.object({
  teamName: yup
    .string()
    .required('Team name is required')
    .test(
      'is-teamName-taken',
      'Team name is already registered',
      teamNameNotTaken,
    ),
})

export const TeamRegister = () => {
  const { tournament } = useTournament()
  const { user } = useAuth()

  const classes = useStyles()
  const [serverError, setServerError] = useState('')
  const [teammates, setTeammates] = useState([])
  const [captainEmail, setCaptainEmail] = useState(user?.email)

  const formik = useFormik({
    initialValues: {
      teamName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // clear any previous errors
      setServerError('')
      // return signup(values).then(
      //   () => {
      //     window.location.href = '/'
      //   },
      //   () => {
      //     setServerError('An error occurred on the server, please try again')
      //   },
      // )
    },
  })

  return (
    <div className={classes.paper}>
      <TeamBreadcrumbs />
      <Typography variant="h2">Register your team</Typography>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <TextField
          name="teamName"
          variant="outlined"
          required
          fullWidth
          id="teamName"
          label="Team Name"
          value={formik.values.teamName}
          onChange={formik.handleChange}
          error={formik.touched.teamName && Boolean(formik.errors.teamName)}
          helperText={formik.touched.teamName && formik.errors.teamName}
          autoFocus
        />
        <TeammateSearch
          tournamentId={tournament.id}
          teammates={teammates}
          setTeammates={setTeammates}
        />
      </form>
    </div>
  )
}
