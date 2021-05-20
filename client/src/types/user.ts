export interface User {
  firstName: string
  lastName: string
  email: string
  username: string
}

export interface SignUpPanties extends User {
  password: string
}
