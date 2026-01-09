/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSources } from '../interface/error'
import config from '../config'

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something Went Wrong!'
  let errorSources

  const handleZodHandler = (err: ZodError) => {
    const errorSources: TErrorSources = err.issues?.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      }
    })
    const statusCode = 300

    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    }
  }

  if (err instanceof ZodError) {
    const simplifiedError = handleZodHandler(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err.stack : null,
  })
}

//adding error handeling zod cast mongooes, developen error

export default GlobalErrorHandler
