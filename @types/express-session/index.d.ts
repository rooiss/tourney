import { User } from '../entity/User'

declare module 'express-session' {
   interface Session {
    user: User
  }
}
