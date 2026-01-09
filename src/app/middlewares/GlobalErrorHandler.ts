/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something Went Wrong!'

  type TErrorSources = {
    path: string | number
    message: string
  }[]

  const errorSources: TErrorSources = [
    {
      path: '',
      message: 'my error is ',
    },
  ]

  if (err instanceof ZodError) {
    statusCode = 400
    message = 'this is zod error'
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error: err,
    stack: err.stack,
  })
}

//adding error handeling zod cast mongooes, developen error

export default GlobalErrorHandler
