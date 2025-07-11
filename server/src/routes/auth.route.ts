import { Router } from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", authMiddleware, updateProfile);
router.get("/check", authMiddleware, checkAuth);

export default router;
