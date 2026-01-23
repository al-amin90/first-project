/* eslint-disable @typescript-eslint/no-unused-vars */

import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { userServices } from './auth.service'

const loginUser = catchAsync(async (req, res, next) => {
  const result = await userServices.loginUser(req.body)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is logged in Successfully',
    data: result,
  })
})

export const authControllers = {
  loginUser,
}
