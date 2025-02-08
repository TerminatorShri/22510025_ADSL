import Student from "../models/student.model.js";

/**
 * Get unattempted exams for a student
 */
export const getUnattemptedExams = async (req, res) => {
  try {
    const { studentId } = req.params;
    const exams = await Student.getUnattemptedExams(studentId);
    res.status(200).json({
      success: true,
      message: "Unattempted exams retrieved successfully",
      data: exams,
    });
  } catch (error) {
    console.error("Error fetching unattempted exams:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Get attempted exams for a student
 */
export const getAttemptedExams = async (req, res) => {
  try {
    const { studentId } = req.params;
    const exams = await Student.getAttemptedExams(studentId);
    res.status(200).json({
      success: true,
      message: "Attempted exams retrieved successfully",
      data: exams,
    });
  } catch (error) {
    console.error("Error fetching attempted exams:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Start an exam for a student
 */
export const startExam = async (req, res) => {
  try {
    const { studentId, examId } = req.body;
    const response = await Student.startExam(studentId, examId);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error starting exam:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Get questions for a specific exam
 */
export const getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await Student.getExamQuestions(examId);
    res.status(200).json({
      success: true,
      message: "Exam questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Submit all answers at once for an exam
 */
export const submitExamAnswers = async (req, res) => {
  try {
    const { attemptId, answers } = req.body;
    const response = await Student.submitExamAnswers(attemptId, answers);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Get details of an attempted exam
 */
export const getAttemptedExamDetails = async (req, res) => {
  try {
    const { studentId, examId } = req.params;
    console.log(studentId, examId);
    const examDetails = await Student.getAttemptedQuestions(studentId, examId);
    res.status(200).json({
      success: true,
      message: "Attempted exam details retrieved successfully",
      data: examDetails,
    });
  } catch (error) {
    console.error("Error fetching attempted exam details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
