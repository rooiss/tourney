import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div>
      <h1>Sign up. Check in. Start playing.</h1>
      <p>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/signup"
        >
          Sign up
        </Button>
      </p>
    </div>
  )
}
