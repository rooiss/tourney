import { Request } from 'express'
import { User } from '../entity/User'

export const setUserToSession = (req: any, userModel: User) => {
  let user = {
    firstName: userModel.firstName,
    lastName: userModel.lastName,
    username: userModel.username,
    email: userModel.email,
  }
  // console.log('USER--------', user)
  req.session.user = user
  // console.log('REQ SESSION---------', req.session.user)
}
