/* eslint-disable @typescript-eslint/no-unused-vars */
import userService from './user.service'
import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createAcademicSemester = catchAsync(async (req, res, next) => {
  //   const { password, student: studentDate } = req.body

  //   const result = await userService.createStudentDateIntoDB(
  //     password,
  //     studentDate,
  //   )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is create Successfully',
    data: result,
  })
})

export const academicSemesterController = {
  createAcademicSemester,
}
