import { MomentInput } from 'moment'

export interface TrainingModel {
  id: string
  date: MomentInput
  name: string
  exerciseList: any
}

export const isTrainingValid = (training?: Partial<TrainingModel>): boolean => {
  if (!training) {
    return false
  }

  const { date, exerciseList, id, name } = training

  if (!date || !exerciseList || !id || !name) {
    return false
  }

  return true
}
