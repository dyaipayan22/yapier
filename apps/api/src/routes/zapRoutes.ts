import { Router } from "express";
import {
  createZap,
  getAllZaps,
  getZapById,
} from "../controllers/zapController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/", authenticateUser, createZap);
router.get("/", authenticateUser, getAllZaps);
router.get("/:zapId", authenticateUser, getZapById);

export default router;
