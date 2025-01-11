import express from "express"
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
// import { userValidation } from "../users/user.validation";
import { authValidation } from "./auth.validation";
const router = express.Router();
router.post('/register',
  // validateRequest(userValidation.userValidationSchema),
  authController.registerUser);
router.post('/login',validateRequest(authValidation.authValidationSchema),authController.loginUser);

export const authRoutes = router;