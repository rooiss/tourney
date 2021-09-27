import React, { useState } from 'react'
import { Alert } from '@material-ui/lab'
import { Button } from '@material-ui/core'

export const VerifyMessage = () => {
  const [emailSent, setEmailSent] = useState(false)

  const verifyEmail = () => {
    fetch('/api/verify')
      .then((res) => res.json())
      .then((data) => {
        setEmailSent(true)
      })
  }
  return (
    <Alert severity="info">
      {emailSent
        ? 'Check your email for verification email'
        : 'Your account is not verified yet'}
      <Button color={'primary'} onClick={verifyEmail}>
        Verify
      </Button>
    </Alert>
  )
}
