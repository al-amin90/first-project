/* eslint-disable @typescript-eslint/no-unused-vars */

import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { authServices } from './auth.service'

const loginUser = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUser(req.body)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is logged in Successfully',
    data: result,
  })
})

const changePassword = catchAsync(async (req, res, next) => {
  const result = await authServices.changePassword(req.user, req.body)

  console.log(req.user, req.body)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password change Successfully',
    data: [],
  })
})

export const authControllers = {
  loginUser,
  changePassword,
}
