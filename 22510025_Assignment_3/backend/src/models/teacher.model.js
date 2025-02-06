import dbInstance from "../config/mysql.config.js";

const Teacher = {
  getTeacherInfo: async (teacherId) => {
    const query = `
          SELECT DISTINCT
              i.ID AS teacher_id,
              i.name AS teacher_name,
              i.dept_name,
              i.salary,
              c.course_id,
              c.title AS course_title,
              c.credits,
              te.semester,
              te.year
          FROM instructor i
          LEFT JOIN teaches te ON i.ID = te.ID
          LEFT JOIN course c ON te.course_id = c.course_id
          WHERE i.ID = ?;
        `;
    const [rows] = await dbInstance.execute(query, [teacherId]);
    return rows.length > 0 ? rows : null;
  },

  getTeacherSchedule: async (teacherId, semester) => {
    const query = `
      SELECT 
          sec.course_id,
          c.title AS course_title,
          sec.semester,
          sec.year,
          cl.building AS building_name,
          cl.room_number,
          ts.day,
          ts.start_time,
          ts.end_time
      FROM teaches te
      INNER JOIN section sec ON te.course_id = sec.course_id 
          AND te.sec_id = sec.sec_id
          AND te.semester = sec.semester
          AND te.year = sec.year
      INNER JOIN course c ON sec.course_id = c.course_id
      LEFT JOIN classroom cl ON sec.building = cl.building 
          AND sec.room_number = cl.room_number
      INNER JOIN timeslot ts ON sec.time_slot_id = ts.time_slot_id
      WHERE te.ID = ?
          AND sec.semester = ?;
    `;
    const [rows] = await dbInstance.execute(query, [teacherId, semester]);
    return rows.length > 0 ? rows : null;
  },

  getStudentsWithMarks: async (teacherId) => {
    const query = `
      SELECT 
          t.ID AS student_id,
          s.name AS student_name,
          t.course_id,
          c.title AS course_title,
          t.semester,
          t.year,
          t.grade,
          t.sec_id
      FROM teaches te
      INNER JOIN takes t ON te.course_id = t.course_id 
          AND te.sec_id = t.sec_id
          AND te.semester = t.semester
          AND te.year = t.year
      INNER JOIN student s ON t.ID = s.ID
      INNER JOIN course c ON t.course_id = c.course_id
      WHERE te.ID = ?;
    `;
    const [rows] = await dbInstance.execute(query, [teacherId]);
    return rows.length > 0 ? rows : null;
  },
  
  assignGradeToStudent: async (
    studentId,
    courseId,
    secId,
    semester,
    year,
    grade
  ) => {
    // Check if the course exists in the 'takes' table for the given student
    const checkEnrollmentQuery = `
      SELECT t.course_id, c.credits
      FROM takes t
      INNER JOIN course c ON t.course_id = c.course_id
      WHERE t.ID = ? AND t.course_id = ? AND t.sec_id = ? AND t.semester = ? AND t.year = ?;
    `;
    const [enrollment] = await dbInstance.execute(checkEnrollmentQuery, [
      studentId,
      courseId,
      secId,
      semester,
      year,
    ]);

    if (enrollment.length === 0) {
      return {
        success: false,
        message: "Student is not enrolled in this course",
      };
    }

    const courseCredits = enrollment[0].credits;

    // Update the grade in the 'takes' table
    const updateGradeQuery = `
      UPDATE takes
      SET grade = ?
      WHERE ID = ? AND course_id = ? AND sec_id = ? AND semester = ? AND year = ?;
    `;
    await dbInstance.execute(updateGradeQuery, [
      grade,
      studentId,
      courseId,
      secId,
      semester,
      year,
    ]);

    // If the grade is not "F", update the total_cred for the student
    if (grade !== "F") {
      const updateTotalCredQuery = `
        UPDATE student
        SET tot_cred = tot_cred + ?
        WHERE ID = ?;
      `;
      await dbInstance.execute(updateTotalCredQuery, [
        courseCredits,
        studentId,
      ]);
    }

    return {
      success: true,
      message: "Grade assigned successfully and credits updated",
    };
  },
};

export default Teacher;
