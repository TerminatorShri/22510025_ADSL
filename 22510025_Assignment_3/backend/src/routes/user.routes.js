import express from "express";
import {
  loginUser,
  changeUserName,
  changePassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.put("/:userId/username", changeUserName);
router.put("/:userId/password", changePassword);

export default router;
