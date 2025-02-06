import express from "express";
import {
  addStudent,
  getNewCoursesWithoutTimeSlot,
  updateTimeSlotForCourse,
} from "../controllers/registrar.controller.js";

const router = express.Router();

// Route to add a new student
router.post("/add-student", addStudent);

// Route to get new courses for a department without time slots
router.get("/new-courses", getNewCoursesWithoutTimeSlot);

// Route to add or update time slot for a course
router.post("/update-time-slot", updateTimeSlotForCourse);

export default router;
