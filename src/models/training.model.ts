import { MomentInput } from 'moment'
import { Document } from 'mongoose'
import { BigSource } from 'big.js'

export interface ISeries {
  _id: string

  repeats: BigSource
  weight: BigSource
}

export interface ITrainingExercise {
  _id: string
  exerciseId: string

  sequenceNumber: number
  userWeight: BigSource

  seriesList: ISeries[]
}

export interface ITraining {
  _id: string
  userId: string

  name: string
  color: string
  date: MomentInput
  exerciseList: ITrainingExercise[]

  createdAt: MomentInput
  updatedAt: MomentInput
}

export type ITrainingDocument = Document & ITraining

export type ITrainingCreate = Omit<ITraining, '_id' | 'userId'>

export const isTrainingValid = (training?: Partial<ITrainingCreate>): boolean => {
  if (!training) {
    return false
  }

  const { date, exerciseList, name, color } = training

  if (!date || !exerciseList || !name || !color) {
    return false
  }

  return true
}
