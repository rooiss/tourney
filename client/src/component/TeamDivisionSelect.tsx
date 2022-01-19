import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'TeamDivisionSelect' },
)

export interface TeamDivisionSelectProps {}

export const TeamDivisionSelect = ({}: TeamDivisionSelectProps) => {
  const classes = useStyles()

  return <div className={classes.root}></div>
}
