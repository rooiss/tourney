import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { AuthProvider } from './component/AuthContext'
import { ButtonAppBar } from './component/AppBar'
import { Home } from './component/Home'
import { Signup } from './component/Signup'
import { Login } from './component/Login'

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
            <Route path="/login" exact>
              <Login />
            </Route>
            {/* need to apply some logic in the logout */}
            {/* <Route path="/logout" exact>
              <Redirect to={'/'} />
            </Route> */}
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
