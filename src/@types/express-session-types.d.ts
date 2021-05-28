import { User } from '../types/users'

declare module 'express-session' {
  interface Session {
    user: User
  }
}
