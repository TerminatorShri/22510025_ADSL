import dbInstance from "../config/mysql.config.js";

const Teacher = {
  // Create a new exam
  createExam: async (
    teacherId,
    courseId,
    title,
    description,
    totalMarks,
    startTime,
    durationMinutes
  ) => {
    const query = `INSERT INTO exams (course_id, created_by, title, description, total_marks, start_time, duration_minutes, question_ids, assigned_students, status) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, '[]', '[]', 'upcoming')`;
    const [rows] = await dbInstance.execute(query, [
      courseId,
      teacherId,
      title,
      description,
      totalMarks,
      startTime,
      durationMinutes,
    ]);

    if (rows.affectedRows > 0) {
      return {
        success: true,
        examId: rows.insertId,
        message: "Exam created successfully",
      };
    }
    return { success: false, message: "Failed to create exam" };
  },

  // Get all exams created by a specific teacher
  getExamsByTeacher: async (teacherId) => {
    const query = `SELECT id, title, description, total_marks, start_time, duration_minutes, status
                   FROM exams WHERE created_by = ?`;
    const [rows] = await dbInstance.execute(query, [teacherId]);
    return rows;
  },

  // Get full details of a specific exam
  getExamDetails: async (examId) => {
    const query = `SELECT e.id, e.title, e.description, e.total_marks, e.start_time, e.duration_minutes, e.status, 
                          c.id AS course_id, c.name AS course_name, c.code AS course_code, 
                          e.question_ids, e.assigned_students
                   FROM exams e
                   JOIN courses c ON e.course_id = c.id
                   WHERE e.id = ?`;
    const [rows] = await dbInstance.execute(query, [examId]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Update exam details
  updateExam: async (
    examId,
    title,
    description,
    totalMarks,
    startTime,
    durationMinutes,
    status
  ) => {
    // First, check if the exam exists
    const checkQuery = "SELECT COUNT(*) AS count FROM exams WHERE id = ?";
    const [checkResult] = await dbInstance.execute(checkQuery, [examId]);

    if (checkResult[0].count === 0) {
      return { success: false, message: "Exam not found" };
    }

    // Update the exam details
    const query = `UPDATE exams 
                   SET title = ?, 
                       description = ?, 
                       total_marks = ?, 
                       start_time = ?, 
                       duration_minutes = ?, 
                       status = ?
                   WHERE id = ?`;

    const [rows] = await dbInstance.execute(query, [
      title,
      description,
      totalMarks,
      startTime,
      durationMinutes,
      status,
      examId,
    ]);

    return rows.affectedRows > 0
      ? { success: true, message: "Exam updated successfully" }
      : { success: false, message: "No changes made to the exam" };
  },

  // Get all questions of an exam
  getExamQuestions: async (examId) => {
    // Step 1: Fetch question_ids JSON array
    const queryFetchIds = `SELECT JSON_LENGTH(question_ids) AS num_questions FROM exams WHERE id = ?`;
    const [result] = await dbInstance.execute(queryFetchIds, [examId]);

    if (!result.length || result[0].num_questions === 0) {
      return []; // No questions assigned
    }

    const numQuestions = result[0].num_questions;

    // Step 2: Dynamically build the SQL query based on JSON array length
    let query = `
      SELECT q.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, 
             q.correct_option, q.image_url, q.difficulty 
      FROM questions q 
      WHERE q.id IN (
    `;

    const unionParts = [];
    for (let i = 0; i < numQuestions; i++) {
      unionParts.push(
        `SELECT JSON_UNQUOTE(JSON_EXTRACT(question_ids, '$[${i}]')) FROM exams WHERE id = ?`
      );
    }

    query += unionParts.join(" UNION ALL ") + ")";

    // Step 3: Execute the query with the examId
    const [rows] = await dbInstance.execute(
      query,
      Array(numQuestions).fill(examId)
    );
    return rows;
  },

  // Get exam results
  getExamResults: async (examId) => {
    const query = `SELECT s.user_id, er.total_score, er.status
                   FROM exam_results er
                   JOIN students s ON er.student_id = s.id
                   JOIN users u ON s.user_id = u.id
                   WHERE er.exam_id = ?`;
    const [rows] = await dbInstance.execute(query, [examId]);
    return rows;
  },

  // Assign students to an exam
  assignStudentsToExam: async (examId, studentIds) => {
    if (!studentIds.length) {
      return { success: false, message: "No students provided for assignment" };
    }

    // Convert studentIds array to a JSON string
    const studentIdsJSON = JSON.stringify(studentIds);

    // Update exam table to include assigned students
    const query = "UPDATE exams SET assigned_students = ? WHERE id = ?";
    const [rows] = await dbInstance.execute(query, [studentIdsJSON, examId]);

    return rows.affectedRows > 0
      ? { success: true, message: "Students assigned to exam successfully" }
      : { success: false, message: "Failed to assign students to exam" };
  },

  // Get assigned students for an exam
  getAssignedStudents: async (examId) => {
    const query = `SELECT u.id, u.username, u.email 
                   FROM users u
                   JOIN students s ON u.id = s.user_id
                   WHERE JSON_CONTAINS((SELECT assigned_students FROM exams WHERE id = ?), JSON_QUOTE(s.id))`;
    const [rows] = await dbInstance.execute(query, [examId]);
    return rows;
  },
};

export default Teacher;
