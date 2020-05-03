import { model, Schema, Types } from 'mongoose'
import { IUserDocument } from '@models/user.model'

const { ObjectId } = Types

const schema: Schema<IUserDocument> = new Schema({
  _id: { type: ObjectId, auto: true },

  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  age: { type: Number },
  weight: { type: Number, required: true },
  isMale: { type: Boolean, required: true, default: true },

  updatedAt: { type: Number, default: Date.now() },
  createdAt: { type: Number, default: Date.now() },
})

schema.pre<IUserDocument>('save', function () {
  this.updatedAt = Date.now()
})

export const UserSchema = model<IUserDocument>('User', schema)
