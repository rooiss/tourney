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

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#008ac9',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
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
              <Container>
                <Home />
              </Container>
            </Route>
            <Route path="/tournaments/:tournamentId" exact>
              <ButtonAppBar />
              <Container>
                <TournamentProvider>
                  <Tournament />
                </TournamentProvider>
              </Container>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
