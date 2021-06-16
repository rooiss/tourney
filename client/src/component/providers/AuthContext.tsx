import React, { createContext, useContext, useState, useEffect } from 'react'

interface IAuthContext {
  isAuthenticated: boolean
  status: 'pending' | 'success' | 'error'
  user: null | {
    firstName: string
    username: string
    email: string
  }
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  status: 'pending',
  user: null,
})

export const AuthProvider = ({ children }: any) => {
  const [state, setState] = useState<IAuthContext>({
    isAuthenticated: false,
    status: 'pending',
    user: null,
  })

  useEffect(() => {
    fetch('/api/users/whoami')
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
      .catch(() => {
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
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
