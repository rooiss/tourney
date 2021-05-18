import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useAuth } from './AuthContext'
import Button from '@material-ui/core/Button'

interface HomeProps {}
const useStyles = makeStyles(() => {
  createStyles({
    loginContainer: {
      display: 'flex',
    },
  })
})
export const Home = ({}: HomeProps) => {
  const classes = useStyles()
  const { user } = useAuth()
  return (
    <div>
      <h1>Sign up. Check in. Start playing.</h1>
      {user ? (
        // make the endpoint work first
        <div>{user}</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
