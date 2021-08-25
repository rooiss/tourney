import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Card, Typography } from '@material-ui/core'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'Team' },
)

export interface TeamProps {}

export const TeamCard = ({ team }) => {
  const classes = useStyles()

  return (
    <Card>
      <AppBar>{team.teamName}</AppBar>
      {team.map((teammate) => {
        return <Typography>{teammate}</Typography>
      })}
    </Card>
  )
}
