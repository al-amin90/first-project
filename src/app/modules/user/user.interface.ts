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
  isUserExistByCustomId(id: string): Promise<IUser> | null
  isPasswordMatch(
    planTextPassword: string,
    hashTextPassword: string,
  ): Promise<IUser> | null
}
