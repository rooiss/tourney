import { User } from '../entity/User'

export const sessionHelper = (req: any, userModel: User) => {
  let user = {
    firstName: userModel.firstName,
    username: userModel.username,
    email: userModel.email,
  }
  req.session.user = user
}
