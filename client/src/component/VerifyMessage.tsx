import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'VerifyMessage' },
)

export const VerifyMessage = () => {
  const classes = useStyles()

  return (
    <Alert severity="info">
      Your account is not verified yet
      <Button component={Link} to={'/api/verify'} color={'primary'}>
        Verify
      </Button>
    </Alert>
  )
}
