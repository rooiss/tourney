export interface User {
  firstName: string
  lastName: string
  email: string
  username: string
}

export interface SignUpCred extends User {
  password: string
}
