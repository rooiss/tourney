import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'RegisteredTeam' },
)

export const RegisteredTeam = () => {
  const classes = useStyles()

  return <div className={classes.root}></div>
}
