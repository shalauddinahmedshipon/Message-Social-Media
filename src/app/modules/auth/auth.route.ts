import express from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../users/user.validation';
import { authValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserValidationSchema),
  authController.registerUser,
);

router.post(
  '/login',
  validateRequest(authValidation.authValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.Admin, USER_ROLE.Scholar,USER_ROLE.User),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword,
);

export const authRoutes = router;
