import express from "express";
import {
  addDepartment,
  addBuildingAndRoom,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Route to add a new department
router.post("/add-department", addDepartment);

// Route to add a new building and room
router.post("/add-building-room", addBuildingAndRoom);

export default router;
