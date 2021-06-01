import { User } from '../entity/User'

export const setUserToSession = (req: any, userModel: User) => {
  let user = {
    firstName: userModel.firstName,
    lastName: userModel.lastName,
    username: userModel.username,
    email: userModel.email,
  }
  req.session.user = user
}
