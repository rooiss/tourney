declare global {
  namespace Express {
    export interface Request {
      session: {
        user: {
          firstName: string
          username: string
          email: string
        }
      }
    }
  }
}
