import React from 'react'
import { makeStyles } from '@material-ui/core'
import { TournamentDetails } from './TournamentDetails'
import { TeamInvites } from './TeamInvites'
import { TeamBreadcrumbs } from './TeamBreadcrumbs'
import { useTournament } from './providers/TournamentContext'
import { TeamCard } from './TeamCard'
import { TournamentTeams } from './TournamentTeams'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    marginTop: theme.spacing(4),
    alignItems: 'center',
  },
  innerPaper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}))

export const Tournament = () => {
  const classes = useStyles()
  const { team } = useTournament()

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <TeamBreadcrumbs />
        <div className={classes.innerPaper}>
          <TournamentDetails />
          {team ? <TeamCard team={team} /> : <TeamInvites />}
        </div>
        <TournamentTeams />
      </div>
    </div>
  )
}
