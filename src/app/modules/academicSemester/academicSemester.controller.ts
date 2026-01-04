/* eslint-disable @typescript-eslint/no-unused-vars */

import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { academicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester is create Successfully',
    data: result,
  })
})

export const academicSemesterControllers = {
  createAcademicSemester,
}
