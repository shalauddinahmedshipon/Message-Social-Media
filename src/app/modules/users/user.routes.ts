import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../users/user.validation';
import { userController } from './user.controller';
const router = express.Router();

router.get(
  '/',
  userController.getAllUser,
);

router.get(
  '/:id',
  userController.getSingleUser,
);

router.post('/request-role-upgrade',auth(USER_ROLE.User),userController.requestRoleUpgrade)

router.patch(
  '/:id',
  auth(USER_ROLE.Admin,USER_ROLE.User,USER_ROLE.Scholar),
  validateRequest(userValidation.updateUserValidationSchema),
  userController.updateProfile,
);


export const userRoutes = router;
