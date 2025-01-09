import express from "express"
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";
const router = express.Router();

router.post('/',auth(USER_ROLE.user),validateRequest(blogValidation.createBlogValidationSchema),blogController.createBlog);
router.get('/',blogController.getAllBlogs);
router.patch('/:id',auth(USER_ROLE.user),validateRequest(blogValidation.updateBlogValidationSchema),blogController.updateBlog);
router.delete('/:id',auth(USER_ROLE.user),blogController.deleteBlog);

export const blogRoutes = router;