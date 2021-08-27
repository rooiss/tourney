import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Card, Toolbar, Typography } from '@material-ui/core'
import { Teammate } from '../types/team'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      minWidth: '33%',
      marginTop: theme.spacing(5),
    },
    title: {
      textAlign: 'left',
    },
    card: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    teamDetails: {
      display: 'flex',
    },
  }),
  { name: 'Team' },
)

export interface TeamProps {}

export const TeamCard = ({ team }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.teamDetails}>
          <Typography variant="h6" className={classes.title}>
            Team {team.teamName}
          </Typography>
          <Typography variant="subtitle2">Roster</Typography>
        </Toolbar>
      </AppBar>
      {team.teamUsers.map((teammate: Teammate) => {
        return (
          <Card key={teammate.id}>
            <Typography variant="h6" className={classes.card}>
              {teammate.firstName}
            </Typography>
          </Card>
        )
      })}
    </div>
  )
}
