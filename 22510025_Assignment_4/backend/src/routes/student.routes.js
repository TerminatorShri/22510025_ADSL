import express from "express";
import {
  getAssignedExams,
  startExam,
  submitAnswer,
  finishExam,
  getStudentResults,
} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/:studentId/exams", getAssignedExams);
router.post("/exam/start", startExam);
router.post("/exam/submit-answer", submitAnswer);
router.put("/exam/:attemptId/finish", finishExam);
router.get("/:studentId/results", getStudentResults);

export default router;
