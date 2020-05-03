import { IAuth, ICreateUser, IUserDocument, validateUser } from '@models/user.model'
import { UserSchema } from '@schemas/user.schema'
import { createHash } from '@util/id.util'

export const login = async (user: IAuth): Promise<IUserDocument | null> => {
  const foundUser = await UserSchema.findOne({
    email: user.email,
    password: createHash(user.password),
  })

  return foundUser
}

export const register = async (user: ICreateUser): Promise<IUserDocument | null> => {
  if (!validateUser(user)) {
    return null
  }

  const createdUser = await UserSchema.create({ ...user, password: createHash(user.password) })

  return createdUser
}
