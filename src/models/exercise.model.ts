import { assertUnreachable } from '@util/assert-unreachable'
import { isPresent } from '@util/type.util'
import { Document } from 'mongoose'
import { MomentInput } from 'moment'

export enum ExerciseTypes {
  /**
   * With regular weight
   */
  Default,

  /**
   * Exercise is being done with body weight, but additionally
   * one can use some weight to make exercise `harder` to do
   */
  WithAdditionalWeight,

  /**
   * Exercise is being done with body weight, but additionally
   * one can use some weight to make exercise `simpler` to do
   */
  WithNegativeWeight,
}

export interface IExercise {
  _id: string
  userId?: string

  type: ExerciseTypes
  name: string
  description?: string

  createdAt: MomentInput
  updatedAt: MomentInput
}

export type IExerciseDocument = IExercise & Document

const isTypeValid = (type?: ExerciseTypes): boolean => {
  if (!isPresent(type)) {
    return false
  }

  switch (type) {
    case ExerciseTypes.Default:
    case ExerciseTypes.WithAdditionalWeight:
    case ExerciseTypes.WithNegativeWeight:
      return true
    default:
      assertUnreachable(type)
      return false
  }
}

export type ICreateExercise = Omit<IExercise, '_id' | 'userId'>

export const isExerciseValid = (exercise?: ICreateExercise | Partial<ICreateExercise>): exercise is ICreateExercise => {
  if (!isPresent(exercise)) {
    return false
  }

  const { name, type } = exercise

  if (!name || !name.trim()) {
    return false
  }

  if (!isPresent(type) || !isTypeValid(type)) {
    return false
  }

  return true
}
