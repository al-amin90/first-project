import status from 'http-status'
import AppError from '../../errors/AppError'
import { TChangePassword, TLoginUser } from './auth.interface'
import { UserModel } from '../user/user.model'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils'

const loginUser = async (payload: TLoginUser) => {
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

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await UserModel.isUserExistByCustomId(userData.id)

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

  if (!(await UserModel.isPasswordMatch(payload.oldPassword, user.password))) {
    throw new AppError(status.FORBIDDEN, 'Password do not match')
  }

  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  const result = await UserModel.findOneAndUpdate(
    {
      id: user.id,
      role: user.role,
    },
    {
      password: newPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  )

  return result
}

export const authServices = {
  loginUser,
  changePassword,
}
