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
  const filtersQuery: FilterQuery<IExerciseDocument> = {
    userId: { $exists: false },
  }

  if (filters?._id) {
    filtersQuery._id = filters?._id
  }

  try {
    const commonExercises: IExercise[] = await ExerciseSchema.find(filtersQuery)
    let customExercises: IExercise[] = []

    if (filters?.userId) {
      customExercises = await ExerciseSchema.find({ userId: filters.userId })
    }

    return commonExercises.concat(customExercises)
  } catch (e) {
    return null
  }
}

export const createExercise = async (ex: Partial<ICreateExercise>, userId: string): Promise<ICreateExercise | null> => {
  if (!isExerciseValid(ex) || !userId) {
    return null
  }

  try {
    const createdExercise = await ExerciseSchema.create({ ...ex, name: ex?.name?.trim(), userId })
    return createdExercise
  } catch (e) {
    return null
  }
}

export const updateExercise = async (ex: IExercise, userId: string): Promise<IExercise | null> => {
  if (!isExerciseValid(ex) || !userId) {
    return null
  }

  const filters: FilterQuery<IExerciseDocument> = { _id: ex._id, userId }

  delete ex._id
  delete ex.userId
  delete ex.createdAt
  delete ex.updatedAt

  try {
    const updated = await ExerciseSchema.updateOne(filters, ex)

    if (updated.ok !== 1) {
      return null
    }

    return await ExerciseSchema.findOne(filters)
  } catch (e) {
    return null
  }
}
