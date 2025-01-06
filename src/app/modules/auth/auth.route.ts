import express from "express"
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../users/user.validation";
const router = express.Router();

router.post('/register',validateRequest(userValidation.userValidationSchema),authController.registerUser);

export const authRoutes = router;