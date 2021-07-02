import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Checkbox } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { Teammate } from '../types/team'

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

export const Teammates = ({ teammates }) => {
  const classes = useStyles()
  const [captain, setCaptain] = useState('')

  const handleCaptain = (teammate: Teammate) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setCaptain(teammate.id || teammate.email)
    } else {
      setCaptain('')
    }
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
          {teammates.map((teammate) => {
            const checked = captain === (teammate.id || teammate.email)
            return (
              <TableRow key={teammate.id || teammate.email}>
                <TableCell component="th" scope="row">
                  {teammate.firstName
                    ? `${teammate.firstName} ${teammate.lastName}`
                    : `${teammate.email}`}
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  {/* fix checkbox so it doesnt check every single one */}
                  <Checkbox
                    checked={checked}
                    onChange={handleCaptain(teammate)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </TableCell>
                <TableCell align="right">
                  <DeleteOutlineIcon />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
