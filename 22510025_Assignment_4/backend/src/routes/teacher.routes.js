import express from "express";
import {
  createExam,
  getExamsByTeacher,
  getExamDetails,
  updateExam,
  getExamQuestions,
  getExamResults,
  assignStudentsToExam,
  getAssignedStudents,
  addQuestionToExam,
  getCourseID,
} from "../controllers/teacher.controller.js";

const router = express.Router();

router.post("/create", createExam);
router.get("/:teacherId/exams", getExamsByTeacher);
router.get("/exam/:examId", getExamDetails);
router.put("/exam/:examId", updateExam);
router.get("/exam/:examId/questions", getExamQuestions);
router.get("/exam/:examId/results", getExamResults);
router.post("/exam/assign-students", assignStudentsToExam);
router.get("/exam/:examId/assigned-students", getAssignedStudents);
router.post("/exam/add-question", addQuestionToExam);
router.get("/course-id/:examId", getCourseID);

export default router;
