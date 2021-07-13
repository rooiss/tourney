import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TeamInvitesAppBar } from './TeamInvitesAppBar'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      minWidth: '33%',
    },
  }),
  { name: 'TeamInvites' },
)

export const TeamInvites = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TeamInvitesAppBar />
    </div>
  )
}
