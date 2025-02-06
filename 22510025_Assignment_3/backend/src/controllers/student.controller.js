import Student from "../models/student.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

export const getStudentInfo = async (req, res) => {
  try {
    const studentId = req.headers["user-id"]; // Get user ID from headers or cookies

    if (!studentId) {
      return res.status(400).json(new ApiError(400, "Student ID is required"));
    }

    const studentInfo = await Student.getStudentInfo(studentId);
    if (!studentInfo) {
      return res.status(404).json(new ApiError(404, "Student not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          studentInfo,
          "Student information fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to get grades for a specific semester
export const getGradesBySemester = async (req, res) => {
  try {
    const studentId = req.headers["user-id"]; // Get user ID from headers or cookies
    const { semester } = req.params;

    if (!semester) {
      return res.status(400).json(new ApiError(400, "Semester is required"));
    }

    const grades = await Student.getGradesBySemester(studentId, semester);
    if (!grades) {
      return res
        .status(404)
        .json(new ApiError(404, "No grades found for this semester"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, grades, "Grades fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to get subjects for a specific semester
export const getSubjectsBySemester = async (req, res) => {
  try {
    const studentId = req.headers["user-id"]; // Get user ID from headers or cookies
    const { semester } = req.params;

    if (!semester) {
      return res.status(400).json(new ApiError(400, "Semester is required"));
    }

    const subjects = await Student.getSubjectsBySemester(studentId, semester);
    if (!subjects || subjects.length === 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, null, "No subjects found for this semester")
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, subjects, "Subjects fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to get eligible courses based on completed prerequisites
export const getEligibleCourses = async (req, res) => {
  try {
    const studentId = req.headers["user-id"]; // Get user ID from headers or cookies

    if (!studentId) {
      return res.status(400).json(new ApiError(400, "Student ID is required"));
    }

    const eligibleCourses = await Student.getEligibleCourses(studentId);
    if (!eligibleCourses) {
      return res
        .status(404)
        .json(new ApiError(404, "No eligible courses found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          eligibleCourses,
          "Eligible courses fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

export const applyForCourse = async (req, res) => {
  try {
    const { studentId, courseId, secId, semester, year } = req.body;

    console.log(req.body);

    if (!studentId || !courseId || !secId || !semester || !year) {
      console.log("All fields are required");
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await Student.applyForCourse(
      studentId,
      courseId,
      secId,
      semester,
      year
    );
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res.status(200).json(new ApiResponse(200, null, result.message));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};
