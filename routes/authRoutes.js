import express from "express";
import {
  login,
  register,
  currentUser,
  forgotPassword,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
// router.get("/currentuser", protect, currentUser);
router.get("/current-user", protect, currentUser);
router.post("/forgot-password", forgotPassword);
export default router;
