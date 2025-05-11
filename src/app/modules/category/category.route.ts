import express from 'express';
import { categoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import { categoryValidation } from './category.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-category',
  auth(USER_ROLE.Admin),
  validateRequest(categoryValidation.createCategorySchemaValidation),
  categoryController.createCategory
);

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getSingleCategory);
router.patch('/:id',auth(USER_ROLE.Admin),validateRequest(categoryValidation.updateCategorySchemaValidation), categoryController.updateCategory);
router.delete('/:id', auth(USER_ROLE.Admin), categoryController.deleteCategory);

export const categoryRoutes = router;
