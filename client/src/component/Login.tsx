import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { LinearProgress } from '@material-ui/core'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Alert } from '@material-ui/lab'
import { LoginUser } from '../types/users'
import { login } from '../api/login'

const useStyles = makeStyles((theme) => ({
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
}))
// TODO
// validation schema .test needs to change
const validationSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
})

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: LoginUser) => {
      // clear any previous errors
      setServerError('')
      // AJAX call to /api/something
      // console.log('ARE YOU EVEN WORKING??????')
      return login(values).then(
        () => {
          window.location.href = '/'
        },
        () => {
          setServerError('An error occurred on the server, please try again')
        },
      )
    },
  })

  const [serverError, setServerError] = useState('')

  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          {/* this is to display things in formik */}
          {/* <pre>{JSON.stringify(formik, null, 2)}</pre> */}
          {formik.isSubmitting && (
            <LinearProgress
              className={classes.progressIcon}
              color={'secondary'}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  )
}
