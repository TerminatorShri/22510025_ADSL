import HOD from "../models/hod.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

// Controller to get department details
export const getDepartmentDetails = async (req, res) => {
  try {
    const deptName = req.headers["user-id"]; // Extract department name from headers

    if (!deptName) {
      return res
        .status(400)
        .json(new ApiError(400, "Department name is required"));
    }

    const departmentInfo = await HOD.getDepartmentDetails(deptName);
    if (!departmentInfo) {
      return res.status(404).json(new ApiError(404, "Department not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          departmentInfo,
          "Department details fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to get courses with assigned instructors
export const getCoursesWithInstructors = async (req, res) => {
  try {
    const deptName = req.headers["user-id"];

    if (!deptName) {
      return res
        .status(400)
        .json(new ApiError(400, "Department name is required"));
    }

    const courses = await HOD.getCoursesWithInstructors(deptName);
    if (!courses) {
      return res
        .status(404)
        .json(new ApiError(404, "No courses found for this department"));
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

// Controller to add a new course
export const addCourse = async (req, res) => {
  try {
    const { courseId, title, deptName, credits } = req.body;

    if (!courseId || !title || !deptName || !credits) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await HOD.addCourse(courseId, title, deptName, credits);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Course added successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to add a new instructor
export const addInstructor = async (req, res) => {
  try {
    const { instructorId, name, deptName, salary } = req.body;

    if (!instructorId || !name || !deptName || !salary) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await HOD.addInstructor(
      instructorId,
      name,
      deptName,
      salary
    );
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Instructor added successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to update instructor salary
export const updateInstructorSalary = async (req, res) => {
  try {
    const { instructorId, newSalary } = req.body;

    if (!instructorId || !newSalary) {
      return res
        .status(400)
        .json(new ApiError(400, "Instructor ID and new salary are required"));
    }

    const result = await HOD.updateInstructorSalary(instructorId, newSalary);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Salary updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to assign an instructor to a course
export const assignInstructorToCourse = async (req, res) => {
  try {
    const { instructorId, courseId, secId, semester, year } = req.body;
    console.log(req.body);

    if (!instructorId || !courseId || !secId || !semester || !year) {
      console.log("All fields are required");
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await HOD.assignInstructorToCourse(
      instructorId,
      courseId,
      secId,      semester,
      year
    );

    console.log(result);

    if (!result.success) {
      console.log(result.message);
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "Instructor assigned to course successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to add funds to a department's budget
export const addFunds = async (req, res) => {
  try {
    const { deptName, amount } = req.body;
    console.log(req.body);

    if (!deptName || !amount) {
      return res
        .status(400)
        .json(new ApiError(400, "Department name and amount are required"));
    }

    const result = await HOD.addFunds(deptName, amount);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Funds added successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to assign an advisor to a student
export const assignAdvisor = async (req, res) => {
  try {
    const { studentId, instructorId } = req.body;
    console.log(req.body);

    // Check if the necessary fields are provided
    if (!studentId || !instructorId) {
      return res
        .status(400)
        .json(new ApiError(400, "Student ID and Instructor ID are required"));
    }

    const result = await HOD.assignAdvisor(studentId, instructorId);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Advisor assigned successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};
