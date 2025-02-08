import express from "express";
import {
  getUnattemptedExams,
  getAttemptedExams,
  getExamQuestions,
  startExam,
  submitExamAnswers,
  getAttemptedExamDetails,
} from "../controllers/student.controller.js";

const router = express.Router();

// Get unattempted exams
router.get("/:studentId/unattempted-exams", getUnattemptedExams);

// Get attempted exams
router.get("/:studentId/attempted-exams", getAttemptedExams);

// Start an exam
router.post("/start-exam", startExam);

// Get questions for an exam
router.get("/exam/:examId/questions", getExamQuestions);

// Submit all answers at once
router.post("/submit-exam", submitExamAnswers);

// Get attempted exam details
router.get("/:studentId/exam/:examId/details", getAttemptedExamDetails);

export default router;
