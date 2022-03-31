import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { useFormik } from 'formik'
import { createTournament } from '../api/createTournament'
import { Alert } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { TournamentLocationSearch } from './TournamentLocationSearch'
import { Map } from './Map'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  serverErrorMsg: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}))

export function CreateTournament() {
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      selectedDate: null,
      location: null,
      courts: 0,
    },
    onSubmit: (values) => {
      // clear any previous errors
      setServerError('')
      return createTournament(values).then(
        ({ success, tournament }) => {
          // check that success is true
          history.push(`/tournaments/${tournament.id}`)
          console.log('created tournament')
        },
        () => {
          setServerError('An error occurred on the server, please try again')
        },
      )
    },
  })

  // const handleDateChange = useCallback(() => {}, [])

  const [serverError, setServerError] = useState('')

  const classes = useStyles()

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Tournament details
        </Typography>
        {serverError && (
          <Alert className={classes.serverErrorMsg} severity="error">
            {serverError}
          </Alert>
        )}
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  label="Tournament Date"
                  value={formik.values.selectedDate}
                  onChange={(date) => {
                    formik.setFieldValue('selectedDate', date, false)
                  }}
                  animateYearScrolling
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="courts"
                type="number"
                label="Number of courts"
                value={formik.values.courts}
                size="small"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item>
              <TournamentLocationSearch
                tourneyLocation={formik.values.location}
                onChange={(tourneyLocation) =>
                  formik.setFieldValue('location', tourneyLocation, false)
                }
              />
            </Grid>
            <Grid item xs={12}>
              {formik.values.location && (
                <Map tourneyLocation={formik.values.location} />
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  )
}
