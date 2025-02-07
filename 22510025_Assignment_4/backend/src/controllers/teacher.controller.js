import Teacher from "../models/teacher.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

export const addCourse = async (req, res) => {
  try {
    const { teacherId, courseName, courseCode } = req.body;

    if (!teacherId || !courseName || !courseCode) {
      return res.status(400).json(new ApiError(400, "Missing required fields"));
    }

    const result = await Teacher.addCourse(teacherId, courseName, courseCode);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, { courseId: result.courseId }, result.message)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const createExam = async (req, res) => {
  try {
    const {
      teacherId,
      courseId,
      title,
      description,
      totalMarks,
      startTime,
      durationMinutes,
    } = req.body;

    if (
      !teacherId ||
      !courseId ||
      !title ||
      !totalMarks ||
      !startTime ||
      !durationMinutes
    ) {
      return res.status(400).json(new ApiError(400, "Missing required fields"));
    }

    const result = await Teacher.createExam(
      teacherId,
      courseId,
      title,
      description,
      totalMarks,
      startTime,
      durationMinutes
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

export const addQuestionToExam = async (req, res) => {
  try {
    const {
      examId,
      courseId,
      teacherId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      difficulty,
      imageUrl,
    } = req.body;

    if (
      !examId ||
      !courseId ||
      !teacherId ||
      !questionText ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctOption
    ) {
      return res.status(400).json(new ApiError(400, "Missing required fields"));
    }

    const result = await Teacher.addQuestionToExam(
      examId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      difficulty,
      imageUrl,
      courseId,
      teacherId
    );
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, { questionId: result.questionId }, result.message)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const {
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      difficulty,
      imageUrl,
    } = req.body;

    if (
      !questionText ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctOption
    ) {
      return res.status(400).json(new ApiError(400, "Missing required fields"));
    }

    const result = await Teacher.updateQuestion(
      questionId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      difficulty,
      imageUrl
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

export const getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json(new ApiError(400, "Student ID is required"));
    }

    const results = await Teacher.getStudentResults(studentId);
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
