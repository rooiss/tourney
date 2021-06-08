export interface User {
  firstName: string
  lastName: string
  email: string
  username: string
  id: string
}

export interface SignUpCred {
  password: string
  firstName: string
  lastName: string
  email: string
  username: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface UserToSearchResult {
  email: string
  username: string
  id: string
}

export interface UserToCreator {
  id: string
}
