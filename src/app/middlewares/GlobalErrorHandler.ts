/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

const GlobalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something Went Wrong!'

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: err.stack,
  })
}

export default GlobalErrorHandler
