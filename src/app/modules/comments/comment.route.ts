import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { commentValidation } from './comment.validation';
import * as commentController from './comment.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.User,USER_ROLE.Scholar,USER_ROLE.Admin),
  validateRequest(commentValidation.createCommentValidation),
  commentController.createComment
);

router.get('/blog/:blogId', commentController.getCommentsByBlog);

router.patch(
  '/:id',
  auth(USER_ROLE.User,USER_ROLE.Scholar,USER_ROLE.Admin),
  validateRequest(commentValidation.updateCommentValidation),
  commentController.updateComment
);

router.delete('/:id', auth(USER_ROLE.User,USER_ROLE.Scholar,USER_ROLE.Admin), commentController.deleteComment);

export const commentRoutes = router;
