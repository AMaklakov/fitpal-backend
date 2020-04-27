import moment, { MomentInput } from 'moment'
import { isTrainingValid, ITraining, ITrainingCreate } from '@models/training.model'
import { generateId } from '@util/id.util'

export enum DateFormatEnum {
  Default = 'DD.MM.YYYY',
  Calendar = 'YYYY-MM-DD',
}

// TODO move to date utils
export const formatDate = (date: MomentInput, format: string = DateFormatEnum.Default): string => {
  return moment(date).format(format)
}

let trainings: ITraining[] = [
  {
    id: '1',
    name: 'Training today',
    date: moment(),
    exerciseList: [],
  },
  {
    id: '12',
    name: 'Training today 2',
    date: moment(),
    exerciseList: [],
  },
]

export const getTrainingById = (id: string) => {
  return trainings.find((x) => x.id === id)
}

export const getTrainingByDate = (date: MomentInput) => {
  const searchDate = formatDate(date)

  return trainings.filter((x) => formatDate(x.date) === searchDate)
}

export const createTraining = (req: ITrainingCreate): ITraining | null => {
  const training: ITraining = { ...req, id: generateId() }

  if (!isTrainingValid(training)) {
    return null
  }

  trainings = trainings.concat(training)
  return training
}

export const removeTrainingById = (id: string): boolean => {
  if (!id) {
    return false
  }

  if (!trainings.find((x) => x.id === id)) {
    return false
  }

  trainings = trainings.filter((x) => x.id !== id)
  return true
}

export const updateTraining = (id: string, req: ITraining): ITraining | null => {
  if (!isTrainingValid(req)) {
    return null
  }

  if (!trainings.find((x) => x.id === id)) {
    return null
  }

  trainings = trainings.filter((x) => x.id !== id).concat(req)
  return req
}
