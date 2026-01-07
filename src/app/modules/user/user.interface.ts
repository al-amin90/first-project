import { Model } from 'mongoose'

export interface IUser {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'blocked' | 'in-progress'
  isDeleted: boolean
}

export interface IUserModel extends Model<IUser> {
  isUserExist(id: string): Promise<string> | null
}
