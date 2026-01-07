import { model, Schema } from 'mongoose'
import { IUser, IUserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser, IUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['blocked', 'in-progress'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    statics: {
      async isUserExist(id: string) {
        return this.findOne({ id })
      },
    },
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

export const UserModel = model<IUser, IUserModel>('User', userSchema)
