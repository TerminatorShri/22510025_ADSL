import Registrar from "../models/registrar.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

// Controller to add a new student
export const addStudent = async (req, res) => {
  try {
    const { studentId, name, deptName } = req.body;
    console.log(req.body);

    if (!studentId || !name || !deptName) {
      console.log("All fields are required");
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await Registrar.addStudent(studentId, name, deptName);

    if (!result.success) {
      console.log("here");
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Student added successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to get new courses for a department
export const getNewCoursesWithoutTimeSlot = async (req, res) => {
  try {
    const courses = await Registrar.getNewCoursesWithoutTimeSlot();
    if (!courses) {
      return res
        .status(404)
        .json(new ApiError(404, "No new courses found for this department"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, courses, "Courses fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to add or update time slot for a course
export const updateTimeSlotForCourse = async (req, res) => {
  try {
    const {
      courseId,
      secId,
      semester,
      year,
      timeSlotId,
      day,
      startTime,
      endTime,
      building,
      roomNumber,
    } = req.body;

    if (
      !courseId ||
      !secId ||
      !semester ||
      !year ||
      !timeSlotId ||
      !day ||
      !startTime ||
      !endTime ||
      !building ||
      !roomNumber
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await Registrar.updateTimeSlotForCourse(
      courseId,
      secId,
      semester,
      year,
      timeSlotId,
      day,
      startTime,
      endTime,
      building,
      roomNumber
    );
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Time slot updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};
