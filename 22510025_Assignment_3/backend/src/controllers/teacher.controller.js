import Teacher from "../models/teacher.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

// Controller to get teacher information
export const getTeacherInfo = async (req, res) => {
  try {
    const teacherId = req.headers["user-id"]; // Extract teacher ID from headers
    if (!teacherId) {
      return res.status(400).json(new ApiError(400, "Teacher ID is required"));
    }

    // Fetch teacher info along with courses they teach
    const teacherInfo = await Teacher.getTeacherInfo(teacherId);
    if (!teacherInfo || teacherInfo.length === 0) {
      return res.status(404).json(new ApiError(404, "Teacher not found"));
    }

    // Extract common teacher details from the first record
    const { teacher_id, teacher_name, dept_name, salary } = teacherInfo[0];

    // Transform data: Group courses under the teacher
    const teacherData = {
      instructor_id: teacher_id,
      name: teacher_name,
      dept_name,
      salary,
      courses: teacherInfo.map((course) => ({
        course_id: course.course_id,
        course_title: course.course_title,
        credits: course.credits,
        semester: course.semester,
        year: course.year,
      })),
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          teacherData,
          "Teacher information fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

export const getTeacherSchedule = async (req, res) => {
  try {
    const teacherId = req.headers["user-id"]; // Extract teacher ID from headers
    const { semester } = req.params;

    if (!semester) {
      return res.status(400).json(new ApiError(400, "Semester is required"));
    }

    const schedule = await Teacher.getTeacherSchedule(teacherId, semester);
    if (!schedule) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, null, "No schedule found for this semester")
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, schedule, "Schedule fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

export const getStudentsWithMarks = async (req, res) => {
  try {
    const teacherId = req.headers["user-id"]; // Extract teacher ID from headers

    if (!teacherId) {
      return res.status(400).json(new ApiError(400, "Teacher ID is required"));
    }

    const students = await Teacher.getStudentsWithMarks(teacherId);
    if (!students) {
      return res
        .status(404)
        .json(new ApiError(404, "No students found in teacher's courses"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          students,
          "Students with marks fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

export const assignGrade = async (req, res) => {
  try {
    const { studentId, courseId, secId, semester, year, grade } = req.body;

    if (!studentId || !courseId || !secId || !semester || !year || !grade) {
      console.log("All fields are required");
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await Teacher.assignGradeToStudent(
      studentId,
      courseId,
      secId,
      semester,
      year,
      grade
    );

    if (!result.success) {
      console.log(result.message);
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res.status(200).json(new ApiResponse(200, null, result.message));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};
