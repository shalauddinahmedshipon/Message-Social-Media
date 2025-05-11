import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blogs/blog.route';
import { adminRoutes } from '../modules/admin/admin.route';
import { userRoutes } from '../modules/users/user.routes';
import { categoryRoutes } from '../modules/category/category.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
