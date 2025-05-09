import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import { adminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../users/user.validation';
const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(userValidation.createUserValidationSchema),
  adminController.createAdmin,
);

router.patch(
  '/users/:id/role',
  auth(USER_ROLE.Admin),
  adminController.updateUserRole,
);

router.patch(
  '/users/:id/block',
  auth(USER_ROLE.Admin),
  adminController.blockedUser,
);

router.delete(
  '/users/:id/delete',
  auth(USER_ROLE.Admin),
  adminController.deleteUser,
);

router.delete('/blogs/:id/delete', auth(USER_ROLE.Admin), adminController.deleteBlog);

export const adminRoutes = router;
