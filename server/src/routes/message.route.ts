import { Router } from "express";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/users", authMiddleware, getUsersForSidebar);
router.get("/:id", authMiddleware, getMessages);
router.post("/:id", authMiddleware, sendMessage);

export default router;
