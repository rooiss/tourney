export interface User {
  firstName: string
  lastName: string
  email: string
  username: string
  id: string
  verifyCode: string
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
  username: string
  id: string
  firstName: string
  lastNameLetter: string
}

export interface UserToCreator {
  id: string
  username: string
}
