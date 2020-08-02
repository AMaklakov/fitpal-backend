import { Document } from 'mongoose'
import { isPresent, WithRequired } from '@util/type.util'
import { MomentInput } from 'moment'
import { UserValidation } from 'util/validation.util'

export interface IUser {
  _id: string

  firstName: string
  lastName: string
  middleName: string

  email: string
  password: string

  isMale: boolean
  age: string
  weight: string
  height: string

  createdAt: MomentInput
  updatedAt: MomentInput
}

export type ICreateUser = WithRequired<
  Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>,
  'email' | 'password' | 'weight' | 'height' | 'isMale'
>

export type IUpdateUser = Pick<IUser, '_id' | 'weight'>

export type IAuth = Pick<IUser, 'password' | 'email'>

export type IUserDocument = IUser & Document

export const validateLoginUser = (user: IAuth | ICreateUser) => {
  if (!user) {
    return new UserValidation.InvalidRequestError('User is not provided')
  }

  if (!isPresent(user.email) || !isPresent(user.password)) {
    return new UserValidation.InvalidRequestError('Email or Password is not provided')
  }

  if (!UserValidation.isEmail(user.email)) {
    return new UserValidation.InvalidEmailError('Email is not valid')
  }

  if (!UserValidation.isPassword(user.password)) {
    return new UserValidation.InvalidPasswordError('Password is not valid')
  }

  return null
}

export const validateCreateUser = (user: ICreateUser) => {
  const invalidLoginResult = validateLoginUser(user)
  if (invalidLoginResult) {
    return invalidLoginResult
  }

  if (!isPresent(user.weight) || !UserValidation.isWeight(user.weight)) {
    return new UserValidation.InvalidWeightError('Weight must be between 30 and 500')
  }

  if (!isPresent(user.height) || !UserValidation.isHeight(user.height)) {
    return new UserValidation.InvalidHeightError('Height must be between 50 and 350')
  }

  return null
}

export const validateUpdateUser = (user: IUpdateUser) => {
  if (!isPresent(user.weight) || !UserValidation.isWeight(user.weight)) {
    return new UserValidation.InvalidWeightError('Weight must be between 30 and 500')
  }

  return null
}
