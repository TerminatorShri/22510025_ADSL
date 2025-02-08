import Teacher from "../models/teacher.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

export const createExam = async (req, res) => {
  try {
    const {
      teacherId,
      courseId,
      title,
      description,
      total_marks,
      start_time,
      duration_minutes,
    } = req.body;

    if (
      !teacherId ||
      !courseId ||
      !title ||
      !total_marks ||
      !start_time ||
      !duration_minutes
    ) {
      return res.status(400).json(new ApiError(400, "Missing required fields"));
    }

    const result = await Exam.createExam(
      teacherId,
      courseId,
      title,
      description,
      total_marks,
      start_time,
      duration_minutes
    );

    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, { examId: result.examId }, result.message));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const getExamsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json(new ApiError(400, "Teacher ID is required"));
    }

    const exams = await Teacher.getExamsByTeacher(teacherId);
    return res
      .status(200)
      .json(new ApiResponse(200, exams, "Exams retrieved successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const getExamDetails = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!examId) {
      return res.status(400).json(new ApiError(400, "Exam ID is required"));
    }

    const exam = await Teacher.getExamDetails(examId);
    if (!exam) {
      return res.status(404).json(new ApiError(404, "Exam not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, exam, "Exam details retrieved successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const updateExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const {
      title,
      description,
      totalMarks,
      startTime,
      durationMinutes,
      status,
    } = req.body;

    if (!title || !totalMarks || !startTime || !durationMinutes || !status) {
      return res.status(400).json(new ApiError(400, "Missing required fields"));
    }

    const result = await Teacher.updateExam(
      examId,
      title,
      description,
      totalMarks,
      startTime,
      durationMinutes,
      status
    );
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res.status(200).json(new ApiResponse(200, null, result.message));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!examId) {
      return res.status(400).json(new ApiError(400, "Exam ID is required"));
    }

    const questions = await Teacher.getExamQuestions(examId);
    return res
      .status(200)
      .json(
        new ApiResponse(200, questions, "Questions retrieved successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const getExamResults = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!examId) {
      return res.status(400).json(new ApiError(400, "Exam ID is required"));
    }

    const results = await Teacher.getExamResults(examId);
    return res
      .status(200)
      .json(
        new ApiResponse(200, results, "Exam results retrieved successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const assignStudentsToExam = async (req, res) => {
  try {
    const { examId, studentIds } = req.body;

    if (!examId || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid student assignment data"));
    }

    const result = await Teacher.assignStudentsToExam(examId, studentIds);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res.status(200).json(new ApiResponse(200, null, result.message));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const getAssignedStudents = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!examId) {
      return res.status(400).json(new ApiError(400, "Exam ID is required"));
    }

    const students = await Teacher.getAssignedStudents(examId);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          students,
          "Assigned students retrieved successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};
