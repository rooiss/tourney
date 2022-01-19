import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { AuthProvider } from './component/providers/AuthContext'
import { ButtonAppBar } from './component/AppBar'
import { Home } from './component/Home'
import { Signup } from './component/Signup'
import { Login } from './component/Login'
import { CreateTournament } from './component/CreateTournament'
import { Tournament } from './component/Tournament'
import { TournamentProvider } from './component/providers/TournamentContext'
import { Container } from '@material-ui/core'
import { Verification } from './component/Verification'
import { TeamRegister } from './component/TeamRegister'
import { GoogleProvider } from './component/providers/GoogleContext'
import { FollowingProvider } from './component/providers/FollowingProvider'
import { TournamentsProvider } from './component/providers/TournamentsProvider'
import { UiConfigProvider } from './component/providers/UiConfigProvider'
import { DivisionsProvider } from './component/providers/DivisionsProvider'

export default function App() {
  const theme = createMuiTheme({
    palette: {
      background: {
        default: 'white',
      },
      primary: {
        main: '#008ac9',
      },
    },
    typography: {
      fontFamily: ['Urbanist', 'sans-serif'].join(','),
    },
  })
  return (
    <UiConfigProvider>
      <GoogleProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <FollowingProvider>
              <TournamentsProvider>
                <DivisionsProvider>
                  <Router>
                    <Switch>
                      <Route path="/verifyme/:verifyCode" exact>
                        <Verification />
                      </Route>
                      <Route path="/newTournament" exact>
                        <ButtonAppBar />
                        <Container>
                          <CreateTournament />
                        </Container>
                      </Route>
                      <Route path="/login">
                        <ButtonAppBar />
                        <Container>
                          <Login />
                        </Container>
                      </Route>
                      <Route path="/signup" exact>
                        <ButtonAppBar />
                        <Container>
                          <Signup />
                        </Container>
                      </Route>
                      <Route path="/" exact>
                        <ButtonAppBar />
                        <Home />
                      </Route>
                      <Route path="/tournaments/:tournamentId">
                        <ButtonAppBar />
                        <Container>
                          <TournamentProvider>
                            <Switch>
                              <Route
                                path="/tournaments/:tournamentId/createTeam"
                                exact
                              >
                                <TeamRegister />
                              </Route>
                              <Route path="/tournaments/:tournamentId" exact>
                                <Tournament />
                              </Route>
                            </Switch>
                          </TournamentProvider>
                        </Container>
                      </Route>
                    </Switch>
                  </Router>
                </DivisionsProvider>
              </TournamentsProvider>
            </FollowingProvider>
          </AuthProvider>
        </ThemeProvider>
      </GoogleProvider>
    </UiConfigProvider>
  )
}
