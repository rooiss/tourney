import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'clsx'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundImage: 'url(/vballpic.jpeg)',
    backgroundRepeat: 'none',
    backgroundSize: 'cover',
    minHeight: '400px',
    backgroundPosition: '50% 60%',
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  title: {
    color: 'black',
  },
  callCard: {
    backgroundColor: 'rgba(255, 255, 255,0.87)',
    marginLeft: '20%',
    padding: '20px',
    margin: '20px 0px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: '300px',
  },
  infographic: {
    textAlign: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    paddingBottom: '25px',
  },
  infographicContainer: {
    marginTop: '25px',
  },
  infographicGraphic: {
    objectFit: 'contain',
  },
}))

export const Landing = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.paper}>
        <div className={classes.callCard}>
          <h1 className={classes.title}>
            Sign up. <br />
            Check in. <br />
            Start playing.
          </h1>
          <div>
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
            >
              Sign up
            </Button>
            <Button
              className={classes.submit}
              variant="text"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <Container maxWidth="lg" className={classes.infographicContainer}>
        <Grid container spacing={3}>
          <Grid item xs={4} spacing={3}>
            <Card className={cn(classes.infographic)}>
              <CardHeader title="Schedule a tournament" />
              <CardMedia
                component="img"
                height="194"
                image="/images/schedule.svg"
                alt="schedule"
                className={classes.infographicGraphic}
              />
            </Card>
          </Grid>
          <Grid item xs={4} spacing={3}>
            <Card className={cn(classes.infographic)}>
              <CardHeader title="join a team" />
              <CardMedia
                component="img"
                height="194"
                image="/images/team.svg"
                alt="team"
                className={classes.infographicGraphic}
              />
            </Card>
          </Grid>
          <Grid item xs={4} spacing={2}>
            <Card className={cn(classes.infographic)}>
              <CardHeader title="track results" />
              <CardMedia
                component="img"
                height="194"
                image="/images/results.svg"
                alt="results"
                className={classes.infographicGraphic}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
