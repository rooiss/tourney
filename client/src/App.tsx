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
import { TournamentDetails } from './component/TournamentDetails'
import { TournamentProvider } from './component/providers/TournamentContext'

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#648dae',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <ButtonAppBar />
          <Switch>
            <Route path="/newTournament" exact>
              <CreateTournament />
            </Route>
            {/* <Route path="/registertournament" exact>
              <PlayerRegisterTournament />
            </Route> */}
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/tournaments/:tournamentId" exact>
              <TournamentProvider>
                <TournamentDetails />
              </TournamentProvider>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
