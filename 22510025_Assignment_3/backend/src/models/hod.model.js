import dbInstance from "../config/mysql.config.js";

const HOD = {
  getDepartmentDetails: async (deptName) => {
    const query = `
          SELECT 
              d.dept_name,
              d.building,
              d.budget,
              COUNT(c.room_number) AS total_rooms,
              GROUP_CONCAT(DISTINCT c.room_number ORDER BY c.room_number ASC) AS room_numbers
          FROM department d
          LEFT JOIN classroom c ON d.building = c.building
          WHERE d.dept_name = ?
          GROUP BY d.dept_name, d.building, d.budget;
        `;
    const [rows] = await dbInstance.execute(query, [deptName]);
    return rows.length > 0 ? rows[0] : null;
  },

  getCoursesWithInstructors: async (deptName) => {
    const query = `
      SELECT DISTINCT
          c.course_id,
          c.title AS course_title,
          c.credits,
          i.ID AS instructor_id,
          i.name AS instructor_name,
          i.salary
      FROM course c
      LEFT JOIN teaches t ON c.course_id = t.course_id  -- Get instructor ID from teaches table
      LEFT JOIN instructor i ON t.ID = i.ID  -- Get instructor details
      WHERE c.dept_name = ?;
    `;
    const [rows] = await dbInstance.execute(query, [deptName]);
    return rows.length > 0 ? rows : null;
  },

  addFunds: async (deptName, amount) => {
    const query = `
      UPDATE department
      SET budget = budget + ?
      WHERE dept_name = ?;
    `;
    const [result] = await dbInstance.execute(query, [amount, deptName]);

    return result.affectedRows > 0
      ? { success: true, message: "Funds added successfully" }
      : { success: false, message: "Failed to add funds" };
  },

  addCourse: async (courseId, title, deptName, credits) => {
    const query = `
      INSERT INTO course (course_id, title, dept_name, credits) 
      VALUES (?, ?, ?, ?);
    `;
    const [result] = await dbInstance.execute(query, [
      courseId,
      title,
      deptName,
      credits,
    ]);
    return result.affectedRows > 0
      ? { success: true, message: "Course added successfully" }
      : { success: false, message: "Failed to add course" };
  },

  addInstructor: async (instructorId, name, deptName, salary) => {
    const query = `
      INSERT INTO instructor (ID, name, dept_name, salary) 
      VALUES (?, ?, ?, ?);
    `;
    const [result] = await dbInstance.execute(query, [
      instructorId,
      name,
      deptName,
      salary,
    ]);
    return result.affectedRows > 0
      ? { success: true, message: "Instructor added successfully" }
      : { success: false, message: "Failed to add instructor" };
  },

  updateInstructorSalary: async (instructorId, newSalary) => {
    const query = `
      UPDATE instructor 
      SET salary = ?
      WHERE ID = ?;
    `;
    const [result] = await dbInstance.execute(query, [newSalary, instructorId]);
    return result.affectedRows > 0
      ? { success: true, message: "Salary updated successfully" }
      : { success: false, message: "Failed to update salary" };
  },

  assignInstructorToCourse: async (
    instructorId,
    courseId,
    secId,
    semester,
    year
  ) => {
    // First, check if the instructor exists
    const checkInstructorQuery = `SELECT ID FROM instructor WHERE ID = ?`;
    const [instructor] = await dbInstance.execute(checkInstructorQuery, [
      instructorId,
    ]);
    if (instructor.length === 0) {
      return { success: false, message: "Instructor not found" };
    }

    // Next, check if the course exists
    const checkCourseQuery = `SELECT course_id FROM course WHERE course_id = ?`;
    const [course] = await dbInstance.execute(checkCourseQuery, [courseId]);
    if (course.length === 0) {
      return { success: false, message: "Course not found" };
    }

    // Finally, insert into teaches table
    const insertQuery = `
      INSERT INTO teaches (ID, course_id, sec_id, semester, year) 
      VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await dbInstance.execute(insertQuery, [
      instructorId,
      courseId,
      secId,
      semester,
      year,
    ]);

    return result.affectedRows > 0
      ? { success: true, message: "Instructor assigned to course successfully" }
      : { success: false, message: "Failed to assign instructor" };
  },

  assignAdvisor: async (studentId, instructorId) => {
    // Check if student exists
    const checkStudentQuery = `SELECT ID FROM student WHERE ID = ?`;
    const [student] = await dbInstance.execute(checkStudentQuery, [studentId]);
    if (student.length === 0) {
      return { success: false, message: "Student not found" };
    }

    // Check if instructor exists
    const checkInstructorQuery = `SELECT ID FROM instructor WHERE ID = ?`;
    const [instructor] = await dbInstance.execute(checkInstructorQuery, [
      instructorId,
    ]);
    if (instructor.length === 0) {
      return { success: false, message: "Instructor not found" };
    }

    // Assign advisor
    const insertQuery = `INSERT INTO advisor (s_ID, i_ID) VALUES (?, ?);`;
    const [result] = await dbInstance.execute(insertQuery, [
      studentId,
      instructorId,
    ]);

    return result.affectedRows > 0
      ? { success: true, message: "Advisor assigned successfully" }
      : { success: false, message: "Failed to assign advisor" };
  },
  
};

export default HOD;
