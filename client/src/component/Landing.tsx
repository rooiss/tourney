import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { CheckCircleOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundImage: 'url(/vballpic.png)',
    backgroundRepeat: 'none',
    backgroundSize: 'cover',
    // minHeight: '575px',
    height: '575px',
    backgroundPosition: '40% 60%',
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '25px',
  },
  title: {
    color: 'white',
    fontWeight: 800,
    fontSize: '48px',
    // width: '55%',
  },
  callCard: {
    // backgroundColor: 'rgba(255, 255, 255,0.87)',
    // border: 'solid 3px white',
    marginLeft: '15%',
    padding: '20px',
    margin: '100px 0px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '600px',
    height: '450px',
  },
  infographic: {
    textAlign: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    paddingBottom: '25px',
    border: 'none',
  },
  infographicContainer: {
    marginTop: '40px',
  },
  infographicGraphic: {
    objectFit: 'contain',
  },
  blurb: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 600,
  },
  blurbTitle: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#434343',
  },
  gridContainer: {
    // border: 'solid 2px red',
    justifyContent: 'space-around',
  },
  blurbSubHeader: {
    fontSize: '24px',
    fontWeight: 500,
  },
  blurbBody: {
    fontSize: '22px',
  },
  blurbBar: {
    width: '96px',
    height: '1px',
    border: 'solid 3px #3a95ff',
    marginLeft: '16px',
  },
  checkCircle: {
    fontSize: 'large',
    color: '#3a95ff',
    marginRight: '7px',
  },
  blurbImage: {
    marginLeft: '32px',
  },
  gridItem: {
    margin: '32px 0px',
  },
}))

export const Landing = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.paper}>
        <div className={classes.callCard}>
          <Typography className={classes.title}>
            Sign up for Volleyball Tournaments near you
          </Typography>
          <Typography className={classes.blurb}>
            Sign up, check in, and start playing in volleyball tournaments near
            you.
          </Typography>
          <div>
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/signup"
            >
              Sign up
            </Button>
            {/* <Button
              className={classes.submit}
              variant="text"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button> */}
          </div>
        </div>
      </div>
      <Container maxWidth="lg" className={classes.infographicContainer}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={5} className={classes.gridItem}>
            <img
              src="/images/Calendar.svg"
              alt="calendar"
              className={classes.blurbImage}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <List>
              <ListItem>
                <Typography className={classes.blurbTitle}>
                  Schedule a Tournament
                </Typography>
              </ListItem>
              <Box className={classes.blurbBar} />
              <ListItem>
                <Typography className={classes.blurbSubHeader}>
                  Use our scheduling tool to create and schedule a tournament
                </Typography>
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Add collaborators and roles to your tournaments"
                />
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Choose a location and time with our scheduling tool"
                />
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Share your tournament with our community"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={5} className={classes.gridItem}>
            <List>
              <ListItem>
                <Typography className={classes.blurbTitle}>
                  Join a Team
                </Typography>
              </ListItem>
              <Box className={classes.blurbBar} />
              <ListItem>
                <Typography className={classes.blurbSubHeader}>
                  It's simple to join and become part of our volleyball
                  community
                </Typography>
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Register as a member for free"
                />
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Join a team that you were invited to"
                />
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Find teams that are looking for players to add on"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3} className={classes.gridItem}>
            <img src="/images/team.svg" alt="team" />
          </Grid>
          <Grid item xs={5} className={classes.gridItem}>
            <img src="/images/Grades.svg" alt="Grades" />
          </Grid>
          <Grid item xs={5} className={classes.gridItem}>
            <List>
              <ListItem>
                <Typography className={classes.blurbTitle}>
                  Track Results
                </Typography>
              </ListItem>
              <Box className={classes.blurbBar} />
              <ListItem>
                <Typography className={classes.blurbSubHeader}>
                  Finding results and tracking progress of tournaments has never
                  been easier
                </Typography>
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Register as a member"
                />
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Join a team that you were invited to"
                />
              </ListItem>
              <ListItem>
                <CheckCircleOutline className={classes.checkCircle} />
                <ListItemText
                  className={classes.blurbBody}
                  primary="Find teams that are looking for players to add on"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
