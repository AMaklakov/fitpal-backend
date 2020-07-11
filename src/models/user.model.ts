import { Document } from 'mongoose'
import { isPresent, WithRequired } from '@util/type.util'
import { MomentInput } from 'moment'
import { isEmail, InvalidRequestError, InvalidEmailError, isPassword, InvalidPasswordError } from 'util/validation.util'

export interface IUser {
  _id: string

  firstName: string
  lastName: string
  middleName: string

  email: string
  password: string

  isMale: boolean
  age: number
  weight: number

  createdAt: MomentInput
  updatedAt: MomentInput
}

export type ICreateUser = WithRequired<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>, 'email' | 'password' | 'weight'>

export type IAuth = Pick<IUser, 'password' | 'email'>

export type IUserDocument = IUser & Document

export const validateUser = (user: ICreateUser) => {
  if (!user) {
    return new InvalidRequestError('User is not provided')
  }

  if (!isPresent(user.email) || !isPresent(user.password)) {
    return new InvalidRequestError('Email or Password is not provided')
  }

  if (!isEmail(user.email)) {
    return new InvalidEmailError('Email is not valid')
  }

  if (!isPassword(user.password)) {
    return new InvalidPasswordError('Password is not valid')
  }

  return null
}
