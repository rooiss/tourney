import { User } from '../entity/User'

export const setUserToSession = (req: any, userModel: User) => {
  let user = {
    firstName: userModel.firstName,
    lastName: userModel.lastName,
    username: userModel.username,
    email: userModel.email,
    id: userModel.id,
  }
  req.session.user = user
}
