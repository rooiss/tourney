import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './providers/AuthContext'
import { Redirect, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'Verification' },
)

export const Verification = () => {
  const { user } = useAuth()
  const { verifyCode } = useParams<{ verifyCode: string }>()
  const classes = useStyles()

  useEffect(() => {
    if (!user) {
      return
    }
    fetch('/api/verify/confirm')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = `/?message=${encodeURIComponent(
            'Your account has been verified!',
          )}`
        }
      })
  }, [user])

  if (!user) {
    return (
      <Redirect
        to={`/login?redirectTo=${encodeURIComponent(
          `/verifyme/${verifyCode}`,
        )}`}
      />
    )
  }
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}
