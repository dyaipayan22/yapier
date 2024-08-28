import { Router } from "express";
import {
  forgotPassword,
  registerUser,
  resetPassword,
} from "../controllers/userController";

const router: Router = Router();

router.post("/create", registerUser);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

export default router;
