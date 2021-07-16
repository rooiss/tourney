import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Breadcrumbs, Link } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { useTournament } from './providers/TournamentContext'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'TeamBreadcrumbs' },
)

export const TeamBreadcrumbs = () => {
  const classes = useStyles()
  const { tournament } = useTournament()

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link component={RouterLink} to={'/'}>
          Dashboard
        </Link>
        <Link component={RouterLink} to={`/tournaments/${tournament.id}`}>
          {tournament.selectedDate}
        </Link>
      </Breadcrumbs>
    </div>
  )
}
