import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTournament } from './providers/TournamentContext'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    teammateDeets: {
      display: 'flex',
    },
    teamCard: {
      display: 'flex',
      minWidth: 275,
    },
    teamName: {
      fontSize: 14,
    },
    table: {
      minWidth: 600,
    },
  }),
  { name: 'TournamentTeams' },
)

export interface TournamentTeamsProps {}

export const TournamentTeams = ({}: TournamentTeamsProps) => {
  const classes = useStyles()
  const { allTeams } = useTournament()

  return (
    <div className={classes.root}>
      {allTeams && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow color="primary">
                <TableCell>Team</TableCell>
                <TableCell>Roster</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTeams.map((team) => {
                return (
                  <TableRow key={team.id}>
                    <TableCell component="th" scope="row">
                      {team.teamName}
                    </TableCell>
                    {team.teamUsers.map((teammate) => {
                      return (
                        <TableCell align="left">{teammate.firstName}</TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}
