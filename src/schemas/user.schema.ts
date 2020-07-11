import { model, Schema, Types } from 'mongoose'
import { IUserDocument } from '@models/user.model'
import moment from 'moment'

const { ObjectId } = Types

const schema: Schema<IUserDocument> = new Schema({
  _id: { type: ObjectId, auto: true },

  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  age: { type: String },
  weight: { type: String, required: true },
  height: { type: String, required: true },
  isMale: { type: Boolean, required: true, default: true },

  updatedAt: { type: Date, default: moment() },
  createdAt: { type: Date, default: moment() },
})

schema.pre<IUserDocument>('save', function () {
  this.updatedAt = moment()
})

export const UserSchema = model<IUserDocument>('User', schema)
