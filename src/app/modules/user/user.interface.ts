export interface IUser {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'blocked' | 'in-progress'
  isDeleted: boolean
}
