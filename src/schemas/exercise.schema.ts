import { model, Schema, Types } from 'mongoose'
import { IExerciseDocument } from '@models/exercise.model'
import moment from 'moment'

const { ObjectId } = Types

const schema: Schema<IExerciseDocument> = new Schema({
  _id: { type: ObjectId, auto: true },
  userId: { type: ObjectId, ref: 'User' },

  name: { type: String, required: true },
  type: { type: Number, enum: [0, 1, 2], default: 0 },

  createdAt: { type: Date, default: moment() },
  updatedAt: { type: Date, default: moment() },
})

schema.pre<IExerciseDocument>('save', function () {
  this.updatedAt = moment()
})

export const ExerciseSchema = model<IExerciseDocument>('Exercise', schema)
