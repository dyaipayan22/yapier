import { Router } from "express";
import {
  refreshAccessToken,
  signInUser,
  signOutUser,
} from "../controllers/authController";

const router: Router = Router();

router.post("/signIn", signInUser);
router.get("/refresh", refreshAccessToken);
router.post("/signOut", signOutUser);

export default router;
