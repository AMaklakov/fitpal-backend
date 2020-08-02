import { IUser, IUpdateUser, validateUpdateUser } from '@models/user.model'
import { UserSchema } from '@schemas/user.schema'

interface IUserFilters {
  _id?: string
}

export const updateUser = async (
  filters: IUserFilters,
  user: IUpdateUser
): Promise<{ user: IUser | null; error: ReturnType<typeof validateUpdateUser> }> => {
  const validationResult = validateUpdateUser(user)

  if (validationResult !== null) {
    return {
      user: null,
      error: validationResult,
    }
  }

  const updatedUser = await UserSchema.updateOne(filters, user)

  return {
    user: updatedUser,
    error: null,
  }
}
