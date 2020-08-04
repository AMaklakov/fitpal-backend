import { IUserDocument, IUpdateUser, validateUpdateUser } from '@models/user.model'
import { UserSchema } from '@schemas/user.schema'

interface IUserFilters {
  _id?: string
}

export const updateUser = async (
  filters: IUserFilters,
  user: IUpdateUser
): Promise<{ user: IUserDocument | null; error: ReturnType<typeof validateUpdateUser> | { message: string } }> => {
  const validationResult = validateUpdateUser(user)

  if (validationResult !== null) {
    return {
      user: null,
      error: validationResult,
    }
  }

  try {
    const _docUser = await UserSchema.findOne(filters)

    if (_docUser && user.weight !== _docUser.weightHistory[_docUser.weightHistory.length - 1]) {
      user.weightHistory = [..._docUser.weightHistory, user.weight]
    }

    const updatedUser = await UserSchema.updateOne(filters, user)
    if (updatedUser.ok !== 1) {
      return {
        user: null,
        error: { message: 'Cannot update' },
      }
    }

    return {
      user: await UserSchema.findOne(filters),
      error: null,
    }
  } catch (e) {
    return {
      user: null,
      error: { message: 'Cannot update' },
    }
  }
}
