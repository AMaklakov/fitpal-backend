import { isTrainingValid, ITraining, ITrainingCreate } from '@models/training.model'
import { TrainingSchema } from '@schemas/training.schema'
import { MongooseFilterQuery } from 'mongoose'
import { getEndOfDay, getStartOfDay } from '@util/date.util'
import { MomentInput } from 'moment'

interface ITrainingFilters {
  userId: string

  _id?: string
  date?: string
  exerciseId?: string

  dateStart?: MomentInput
  dateEnd?: MomentInput
}

export const getTrainings = async (filters: ITrainingFilters): Promise<ITraining[] | null> => {
  const filterQuery: MongooseFilterQuery<ITraining> = { userId: filters?.userId }

  if (filters?._id) {
    filterQuery._id = filters._id
  }

  if (filters?.date) {
    filterQuery.date = {
      $gte: getStartOfDay(filters.date),
      $lte: getEndOfDay(filters.date),
    }
  }

  if (filters?.exerciseId) {
    filterQuery.exerciseList = {
      $elemMatch: { _id: filters.exerciseId },
    }
  }

  if (filters?.dateStart && filters?.dateEnd) {
    filterQuery.date = {
      $gte: getStartOfDay(filters.dateStart),
      $lte: getEndOfDay(filters.dateEnd),
    }
  }

  try {
    return await TrainingSchema.find(filterQuery)
  } catch (e) {
    return null
  }
}

export const createTraining = async (training: ITrainingCreate, userId: string): Promise<ITraining | null> => {
  if (!isTrainingValid(training)) {
    return null
  }

  try {
    return await TrainingSchema.create({ ...training, userId })
  } catch (e) {
    return null
  }
}

export const removeTrainingById = async (filters: Pick<ITrainingFilters, '_id' | 'userId'>): Promise<boolean> => {
  if (!filters._id || !filters.userId) {
    return false
  }

  try {
    const deleteStatus = await TrainingSchema.remove({ _id: filters._id, userId: filters.userId })
    return deleteStatus.deletedCount === 1
  } catch (e) {
    return false
  }
}

export const updateTraining = async (
  filters: ITrainingFilters,
  training: Partial<ITraining>
): Promise<ITraining | null> => {
  if (!isTrainingValid(training)) {
    return null
  }

  delete training._id
  delete training.userId
  delete training.createdAt
  delete training.updatedAt

  try {
    const updated = await TrainingSchema.updateOne(filters, training)

    if (updated.ok !== 1) {
      throw `Cannot update`
    }

    return await TrainingSchema.findOne(filters)
  } catch (e) {
    return null
  }
}
