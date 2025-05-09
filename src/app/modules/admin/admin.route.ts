import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import { adminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../users/user.validation';
const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(userValidation.userValidationSchema),
  adminController.createAdmin,
);
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  adminController.blockedUser,
);
router.delete('/blogs/:id', auth(USER_ROLE.admin), adminController.deleteBlog);

export const adminRoutes = router;
