import { IAuth, ICreateUser, IUserDocument, validateCreateUser, validateLoginUser } from '@models/user.model'
import { UserSchema } from '@schemas/user.schema'
import { createHash } from '@util/id.util'

export const login = async (
  user: IAuth
): Promise<{ user: IUserDocument | null; error: ReturnType<typeof validateLoginUser> }> => {
  const validationResult = validateLoginUser(user)
  if (validationResult !== null) {
    return {
      user: null,
      error: validationResult,
    }
  }

  const foundUser = await UserSchema.findOne({
    email: user.email,
    password: createHash(user.password),
  })

  return {
    user: foundUser,
    error: null,
  }
}

export const register = async (
  user: ICreateUser
): Promise<{ user: IUserDocument | null; error: ReturnType<typeof validateCreateUser> }> => {
  const validationResult = validateCreateUser(user)
  if (validationResult !== null) {
    return {
      user: null,
      error: validationResult,
    }
  }

  const createdUser = await UserSchema.create({ ...user, password: createHash(user.password) })

  return {
    user: createdUser,
    error: null,
  }
}
