import { model, Schema, Types } from 'mongoose'
import { ITrainingDocument } from '@models/training.model'
import moment from 'moment'

const { ObjectId } = Types

const Series = new Schema({
  _id: { type: ObjectId, auto: true },

  repeats: { type: String, required: true },
  weight: { type: String, required: true },
})

const TrainingExercise = new Schema({
  _id: { type: ObjectId, auto: true },

  exerciseId: { type: ObjectId, ref: 'Exercise', required: true },
  userWeight: { type: String, required: true },
  type: { type: Number, enum: [0, 1, 2], default: 0 },

  seriesList: [Series],
})

const Training: Schema<ITrainingDocument> = new Schema({
  _id: { type: ObjectId, auto: true },
  userId: { type: ObjectId, ref: 'User', required: true },

  name: { type: String, required: true },
  color: { type: String, default: '#DF737F' },
  date: { type: Date, default: moment(), required: true },
  exerciseList: [TrainingExercise],

  createdAt: { type: Date, default: moment() },
  updatedAt: { type: Date, default: moment() },
})

Training.pre<ITrainingDocument>('save', function () {
  this.updatedAt = moment()
})

export const TrainingSchema = model<ITrainingDocument>('Training', Training)
