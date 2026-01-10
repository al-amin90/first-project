/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import handleZodHandler from '../errors/handleZodError'
import handleValidationHandler from '../errors/handleValidationError'

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something Went Wrong!'
  let errorSources

  if (err instanceof ZodError) {
    const simplifiedError = handleZodHandler(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationHandler(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.node_env === 'development' ? err.stack : null,
  })
}

export default GlobalErrorHandler
