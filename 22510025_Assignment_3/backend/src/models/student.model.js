import dbInstance from "../config/mysql.config.js";

const Student = {
  getStudentInfo: async (studentId) => {
    const query = `
          SELECT 
              s.ID AS student_id,
              s.name AS student_name,
              s.dept_name,
              s.tot_cred,
              a.i_ID AS advisor_id,
              i.name AS advisor_name
          FROM student s
          LEFT JOIN advisor a ON s.ID = a.s_ID
          LEFT JOIN instructor i ON a.i_ID = i.ID
          WHERE s.ID = ?;
        `;
    const [rows] = await dbInstance.execute(query, [studentId]);
    return rows.length > 0 ? rows[0] : null;
  },

  getGradesBySemester: async (studentId, semester) => {
    const query = `
    SELECT 
        t.course_id,
        t.grade,
        c.title AS course_title,
        c.credits
    FROM takes t
    INNER JOIN course c ON t.course_id = c.course_id
    WHERE t.ID = ? AND t.semester = ?;
  `;
    const [rows] = await dbInstance.execute(query, [studentId, semester]);
    return rows.length > 0 ? rows : null;
  },

  getSubjectsBySemester: async (studentId, semester) => {
    const query = `
    SELECT 
        sec.course_id,
        c.title AS course_title,
        ts.day,
        ts.start_time,
        ts.end_time,
        cl.room_number,
        cl.building AS building_name,  -- Adding building name
        i.name AS instructor_name  -- Adding instructor's name
    FROM takes t
    INNER JOIN section sec ON t.course_id = sec.course_id 
        AND t.semester = sec.semester
        AND t.year = sec.year
    INNER JOIN course c ON sec.course_id = c.course_id
    INNER JOIN timeslot ts ON sec.time_slot_id = ts.time_slot_id
    LEFT JOIN classroom cl ON sec.building = cl.building 
        AND sec.room_number = cl.room_number
    INNER JOIN teaches te ON sec.course_id = te.course_id 
        AND sec.sec_id = te.sec_id
        AND sec.semester = te.semester
        AND sec.year = te.year
    INNER JOIN instructor i ON te.ID = i.ID  -- Join with instructor table to get the instructor's name
    WHERE t.ID = ? 
        AND sec.semester = ?;
  `;
    const [rows] = await dbInstance.execute(query, [studentId, semester]);
    return rows.length > 0 ? rows : null;
  },

  getEligibleCourses: async (studentId) => {
    const query = `
    SELECT DISTINCT
        p.course_id, 
        c.title AS course_title,
        i.name AS instructor_name,
        c.credits,  -- Include credits for each course
        sec.sec_id,  -- Section ID from section table
        sec.semester, -- Semester from section table
        sec.year -- Year from section table
    FROM prereq p
    INNER JOIN takes t ON t.course_id = p.prereq_id  -- Find prerequisites the student has already taken
    INNER JOIN course c ON p.course_id = c.course_id -- Get the details of the next eligible course
    INNER JOIN teaches te ON te.course_id = c.course_id  -- Get the teaching assignment
    INNER JOIN instructor i ON i.ID = te.ID   -- Get the instructor's name
    INNER JOIN section sec ON sec.course_id = c.course_id -- Get section and semester details
    WHERE t.ID = ?  -- Student ID
    AND p.course_id NOT IN (  -- Exclude courses already taken by the student
      SELECT t.course_id
      FROM takes t
      WHERE t.ID = ?  -- Student ID
    );
  `;

    const [rows] = await dbInstance.execute(query, [studentId, studentId]);
    return rows.length > 0 ? rows : null;
  },

  applyForCourse: async (studentId, courseId, secId, semester, year) => {
    // First, check if the student is eligible for the course
    const checkEligibilityQuery = `
      SELECT 1
      FROM prereq p
      INNER JOIN takes t ON t.course_id = p.prereq_id
      WHERE t.ID = ? AND p.course_id = ?;
    `;
    const [eligibilityCheck] = await dbInstance.execute(checkEligibilityQuery, [
      studentId,
      courseId,
    ]);

    if (eligibilityCheck.length === 0) {
      return {
        success: false,
        message: "Student is not eligible to apply for this course.",
      };
    }

    // Check if the student is already enrolled in the course
    const checkEnrollmentQuery = `
      SELECT 1
      FROM takes
      WHERE ID = ? AND course_id = ? AND sec_id = ? AND semester = ? AND year = ?;
    `;
    const [existingEnrollment] = await dbInstance.execute(
      checkEnrollmentQuery,
      [studentId, courseId, secId, semester, year]
    );

    if (existingEnrollment.length > 0) {
      return {
        success: false,
        message: "Student is already enrolled in this course.",
      };
    }

    // If eligible and not already enrolled, add the student to the takes table
    const applyQuery = `
      INSERT INTO takes (ID, course_id, sec_id, semester, year)
      VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await dbInstance.execute(applyQuery, [
      studentId,
      courseId,
      secId,
      semester,
      year,
    ]);

    return result.affectedRows > 0
      ? { success: true, message: "Successfully applied for the course." }
      : { success: false, message: "Failed to apply for the course." };
  },
};

export default Student;
