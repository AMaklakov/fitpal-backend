import { Document } from 'mongoose'
import { isPresent } from '@util/type.util'

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

  createdAt: number
  updatedAt: number
}

export type ICreateUser = Partial<Omit<IUser, '_id'>>

export type IAuth = Pick<IUser, 'password' | 'email'>

export type IUserDocument = IUser & Document

export const validateUser = (user: ICreateUser): user is Omit<IUser, '_id'> => {
  if (!user) {
    return false
  }

  if (!isPresent(user.email) || !isPresent(user.password)) {
    return false
  }

  return true
}
