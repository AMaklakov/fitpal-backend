import moment, { MomentInput } from 'moment'
import { generateId } from '@util/id.util'

export enum DateFormatEnum {
  Default = 'DD.MM.YYYY',
  Calendar = 'YYYY-MM-DD',
}

// TODO move to date utils
export const formatDate = (date: MomentInput, format: string = DateFormatEnum.Default): string => {
  return moment(date).format(format)
}

const trainings = [
  {
    id: generateId(),
    name: 'Training today',
    date: moment(),
    exerciseList: [],
  },
  {
    id: generateId(),
    name: 'Training today 2',
    date: moment(),
    exerciseList: [],
  },
]

export const getTrainingById = (id: string) => {
  return null
}

export const getTrainingByDate = (date: MomentInput) => {
  const searchDate = formatDate(date)

  return trainings.filter((x) => formatDate(x.date) === searchDate)
}
