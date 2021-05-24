import { Request } from "express";

export type IRequest = Request & {
  session: {
    user: {
      firstName: string
      username: string
      email: string
    }
  }
}