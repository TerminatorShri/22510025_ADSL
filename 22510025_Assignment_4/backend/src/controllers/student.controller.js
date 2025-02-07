import Student from "../models/student.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

export const getAssignedExams = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json(new ApiError(400, "Student ID is required"));
    }

    const exams = await Student.getAssignedExams(studentId);
    return res
      .status(200)
      .json(
        new ApiResponse(200, exams, "Assigned exams retrieved successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const startExam = async (req, res) => {
  try {
    const { studentId, examId } = req.body;

    if (!studentId || !examId) {
      return res
        .status(400)
        .json(new ApiError(400, "Student ID and Exam ID are required"));
    }

    const result = await Student.startExam(studentId, examId);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, { attemptId: result.attemptId }, result.message)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { attemptId, questionId, selectedOption } = req.body;

    if (!attemptId || !questionId || !selectedOption) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await Student.submitAnswer(
      attemptId,
      questionId,
      selectedOption
    );
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res.status(201).json(new ApiResponse(201, null, result.message));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const finishExam = async (req, res) => {
  try {
    const { attemptId } = req.params;

    if (!attemptId) {
      return res.status(400).json(new ApiError(400, "Attempt ID is required"));
    }

    const result = await Student.finishExam(attemptId);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { score: result.score, status: result.status },
          result.message
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json(new ApiError(400, "Student ID is required"));
    }

    const results = await Student.getStudentResults(studentId);
    return res
      .status(200)
      .json(
        new ApiResponse(200, results, "Student results retrieved successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};
