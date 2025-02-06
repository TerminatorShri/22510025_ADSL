import express from "express";
import {
  getTeacherInfo,
  getTeacherSchedule,
  getStudentsWithMarks,
  assignGrade,
} from "../controllers/teacher.controller.js";

const router = express.Router();

// Route to get teacher information
router.get("/info", getTeacherInfo);

// Route to get teacher's schedule based on semester
router.get("/schedule/:semester", getTeacherSchedule);

// Route to get all students with marks in teacher's courses
router.get("/students", getStudentsWithMarks);

// Route to assign grade to a student
router.post("/assign-grade", assignGrade);

export default router;
