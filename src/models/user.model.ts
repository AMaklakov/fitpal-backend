import { Document } from 'mongoose'
import { isPresent, WithRequired } from '@util/type.util'
import { MomentInput } from 'moment'
import { isEmail, ValidationException } from 'util/validation.util'

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

export const validateUser = (user: ICreateUser): user is ICreateUser => {
  if (!user) {
    throw ValidationException('User is not defined')
  }

  if (!isPresent(user.email) || !isPresent(user.password)) {
    throw ValidationException('Password or Email is not provided')
  }

  if (!isEmail(user.email)) {
    throw ValidationException('Invalid Email')
  }

  return true
}
