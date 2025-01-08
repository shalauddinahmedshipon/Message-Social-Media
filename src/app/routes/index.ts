import { Router } from "express";
import { userRoutes } from "../modules/users/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { blogRoutes } from "../modules/blogs/blog.route";

const router = Router();

const moduleRoutes=[
  {
    path:"/users",
    route:userRoutes
  },
  {
    path:"/auth",
    route:authRoutes
  },
  {
    path:"/blogs",
    route:blogRoutes
  },
]

moduleRoutes.forEach((route)=>
router.use(route.path,route.route))

export default router;