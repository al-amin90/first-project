import status from 'http-status'
import AppError from '../../errors/AppError'
import { TChangePassword, TLoginUser } from './auth.interface'
import { UserModel } from '../user/user.model'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'

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
