import status from 'http-status'
import AppError from '../../errors/AppError'
import { TLoginUser } from './auth.interface'
import { UserModel } from '../user/user.model'
import jwt from 'jsonwebtoken'
import config from '../../config'

const loginUser = async (payload: TLoginUser) => {
  console.log(payload)

  const user = await UserModel.isUserExistByCustomId(payload.id)

  if (!user) {
    throw new AppError(status.NOT_FOUND, "The User Does't exists")
  }

  const isDeleted = user.isDeleted
  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'The User is Deleted')
  }

  if (user.status === 'blocked') {
    throw new AppError(status.FORBIDDEN, 'The User is Blocked')
  }

  if (!(await UserModel.isPasswordMatch(payload.password, user.password))) {
    throw new AppError(status.FORBIDDEN, 'Password do not match')
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '10d',
  })

  return {
    token: accessToken,
    needsPasswordChange: user.needsPasswordChange,
  }
}

export const userServices = {
  loginUser,
}
