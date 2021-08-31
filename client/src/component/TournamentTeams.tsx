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
      marginTop: theme.spacing(3),
      display: 'flex',
      // justifyContent: 'space-evenly',
      // minWidth: 400,
    },
    teamCard: {
      display: 'flex',
      minWidth: 275,
    },
    teamName: {
      fontSize: 14,
    },
    table: {
      minWidth: 300,
    },
    topRow: {
      backgroundColor: '#008ac9',
    },
    tableContainer: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
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
      {allTeams &&
        allTeams.map((team) => {
          return (
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
              key={team.id}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.topRow}>
                    <TableCell>Team {team.teamName}'s roster</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team.teamUsers.map((teammate) => {
                    return (
                      <TableRow key={teammate.username}>
                        <TableCell component="th" scope="row">
                          {teammate.username} {teammate.firstName}{' '}
                          {teammate.lastNameLetter}.
                        </TableCell>
                        <TableCell component="th" scope="row"></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )
        })}
    </div>
  )
}
