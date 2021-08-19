import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TeamInvite } from '../types/team'
import { Button, Card, CardContent, Typography } from '@material-ui/core'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'RejectedInvite' },
)

export interface RejectedInviteProps {
  invite: TeamInvite
}

export const RejectedInvite = ({ invite }: RejectedInviteProps) => {
  const classes = useStyles()

  return (
    <Card variant="outlined" className={classes.root} key={invite.id}>
      <CardContent>
        <Typography variant="subtitle2">
          Rejected invite from {invite.teamName}.
          <Button size="small" color="primary" variant="text">
            Accept instead
          </Button>
        </Typography>
      </CardContent>
    </Card>
  )
}
