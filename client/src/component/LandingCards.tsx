import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    card: {},
  }),
  { name: 'LandingCards' },
)

export const LandingCards = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Find Your Teammates
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
