import { ICreateExercise, IExercise, IExerciseDocument, isExerciseValid } from '@models/exercise.model'
import { ExerciseSchema } from '@schemas/exercise.schema'
import defaultExercises from '@const/default-exercises.json'
import { isPresent } from '@util/type.util'
import { FilterQuery } from 'mongoose'

export const fillWithDefaultExercises = async () => {
  const exercises = defaultExercises as ICreateExercise[]

  if (!isPresent(exercises) || exercises.some((e) => !isExerciseValid(e))) {
    throw `Not valid default exercises`
  }

  await ExerciseSchema.create(exercises)
}

export const getExercises = async (filters?: Partial<IExercise>) => {
  const filtersQuery: FilterQuery<IExerciseDocument> = {}

  if (filters?._id) {
    filtersQuery._id = filters?._id
  }

  try {
    const exercises = await ExerciseSchema.find(filtersQuery)
    return exercises
  } catch (e) {
    return null
  }
}

export const createExercise = async (ex: Partial<ICreateExercise>): Promise<ICreateExercise | null> => {
  if (!isExerciseValid(ex)) {
    return null
  }

  try {
    const createdExercise = await ExerciseSchema.create(ex)
    return createdExercise
  } catch (e) {
    return null
  }
}
