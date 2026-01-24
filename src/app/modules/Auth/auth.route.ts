import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authControllers } from './auth.controller'
import { authValidation } from './auth.validation'

const router = Router()

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authControllers.loginUser,
)
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authControllers.loginUser,
)

export const authRouter = router
