import { model, Schema, Types } from 'mongoose'
import { IExerciseDocument } from '@models/exercise.model'

const { ObjectId } = Types

const schema: Schema<IExerciseDocument> = new Schema({
  _id: { type: ObjectId, auto: true },
  userId: { type: ObjectId, ref: 'User' },

  name: { type: String, required: true },
  type: { type: Number, enum: [0, 1, 2], default: 0 },

  updatedAt: { type: Date, default: Date.now() },
})

export const ExerciseSchema = model<IExerciseDocument>('Exercise', schema)
