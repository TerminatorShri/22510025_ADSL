import express from "express";
import {
  getStudentInfo,
  getGradesBySemester,
  getSubjectsBySemester,
  getEligibleCourses,
  applyForCourse,
} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/info", getStudentInfo);

router.get("/grades/:semester", getGradesBySemester);

router.get("/courses/:semester", getSubjectsBySemester);

router.get("/eligible-courses", getEligibleCourses);

router.post("/apply-course", applyForCourse);

export default router;
