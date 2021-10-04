import React, { MouseEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Checkbox, IconButton } from '@material-ui/core'
import { Teammate } from '../types/team'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
  }),
  { name: 'Teammates' },
)

export const Teammates = ({ teammates, captain, setCaptain, setTeammates }) => {
  const classes = useStyles()

  const handleCaptain = (teammate: Teammate) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setCaptain(teammate.id || teammate.email)
    } else {
      setCaptain('')
    }
  }

  const removeTeammate = (index) => (event: MouseEvent) => {
    const newTeam = [...teammates]
    newTeam.splice(index, 1)
    setTeammates(newTeam)
  }

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Teammates</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Captain</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teammates.map((teammate, index) => {
            const checked =
              captain === teammate.email || captain === teammate.id
            return (
              <TableRow key={teammate.email}>
                <TableCell component="th" scope="row">
                  {teammate.firstName
                    ? `${teammate.firstName} ${teammate.lastNameLetter}`
                    : `${teammate.email}`}
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={checked}
                    onChange={handleCaptain(teammate)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={removeTeammate(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
