import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import { adminController } from './admin.controller';
const router = express.Router();


router.get(
  '/users/role-requests',
  auth(USER_ROLE.Admin),
  adminController.getRoleRequests,
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

router.patch(
  '/users/:id/approve-role-request',
  auth(USER_ROLE.Admin),
  adminController.approveRoleRequest,
);

router.delete(
  '/users/:id/delete',
  auth(USER_ROLE.Admin),
  adminController.deleteUser,
);

router.delete('/blogs/:id/delete', auth(USER_ROLE.Admin), adminController.deleteBlog);

export const adminRoutes = router;
