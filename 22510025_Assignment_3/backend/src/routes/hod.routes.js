import express from "express";
import {
  getDepartmentDetails,
  getCoursesWithInstructors,
  addCourse,
  addInstructor,
  updateInstructorSalary,
  assignInstructorToCourse,
  assignAdvisor,
  addFunds,
} from "../controllers/hod.controller.js";

const router = express.Router();

// Route to get department details
router.get("/department", getDepartmentDetails);

// Route to get all courses with assigned instructors
router.get("/courses", getCoursesWithInstructors);

// Route to add a new course
router.post("/add-course", addCourse);

// Route to add a new instructor
router.post("/add-instructor", addInstructor);

// Route to update an instructor's salary
router.put("/update-salary", updateInstructorSalary);

// Route to assign an instructor to a course
router.post("/assign-instructor", assignInstructorToCourse);

// Route to add funds to a department's budget
router.put("/add-funds", addFunds);

// Route to assign an advisor to a student
router.post("/assign-advisor", assignAdvisor);

export default router;
