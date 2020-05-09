import moment, { MomentInput } from 'moment'

export const getStartOfDay = (date: MomentInput) => moment(date).startOf('day')
export const getEndOfDay = (date: MomentInput) => moment(date).endOf('day')
