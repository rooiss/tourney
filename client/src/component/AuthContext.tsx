import React, { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext({
  isAuthenticated: false,
  status: 'pending',
  user: null,
})

export const AuthProvider = ({ children }: any) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    status: 'pending',
    user: null,
  })

  useEffect(() => {
    fetch('/api/whoami')
      .then((res) => res.json())
      .then((body) => {
        if (body.user) {
          setState({
            isAuthenticated: true,
            status: 'success',
            user: body.user,
          })
        } else {
          setState({
            isAuthenticated: false,
            status: 'success',
            user: null,
          })
        }
      })
      .finally(() => {
        setState({
          isAuthenticated: false,
          status: 'success',
          user: null,
        })
      })
  }, [])

  return (
    <AuthContext.Provider value={state}>
      {state.status === 'pending' ? <div>loading...</div> : children}
      {/* {state.status === 'success' ? children : children} */}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
