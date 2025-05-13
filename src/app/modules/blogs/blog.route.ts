import express from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blog.validation';
const router = express.Router();

router.post(
  '/create-blog',
  auth(USER_ROLE.User,USER_ROLE.Admin,USER_ROLE.Scholar),
  validateRequest(blogValidation.createBlogValidationSchema),
  blogController.createBlog,
);

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getSingleBlog);
router.patch(
  '/:id',
  auth(USER_ROLE.User,USER_ROLE.Scholar,USER_ROLE.Admin),
  validateRequest(blogValidation.updateBlogValidationSchema),
  blogController.updateBlog,
);
router.delete('/:id', auth(USER_ROLE.User,USER_ROLE.Scholar,USER_ROLE.Admin), blogController.deleteBlog);

export const blogRoutes = router;
