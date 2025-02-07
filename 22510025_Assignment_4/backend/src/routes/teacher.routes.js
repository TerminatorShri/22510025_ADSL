import express from "express";
import {
  addCourse,
  createExam,
  assignStudentsToExam,
  addQuestionToExam,
  updateQuestion,
  getExamResults,
  getStudentResults,
} from "../controllers/teacher.controller.js";

const router = express.Router();

router.post("/course", addCourse);
router.post("/exam", createExam);
router.post("/exam/assign-students", assignStudentsToExam);
router.post("/exam/add-question", addQuestionToExam);
router.put("/question/:questionId", updateQuestion);
router.get("/exam/:examId/results", getExamResults);
router.get("/student/:studentId/results", getStudentResults);

export default router;
