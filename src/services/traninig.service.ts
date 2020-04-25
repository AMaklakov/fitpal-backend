import moment, { MomentInput } from 'moment'

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
