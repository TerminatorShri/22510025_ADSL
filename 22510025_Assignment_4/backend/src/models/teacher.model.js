import dbInstance from "../config/mysql.config.js";

const Teacher = {
  // Add a new course
  addCourse: async (teacherId, courseName, courseCode) => {
    const checkQuery = "SELECT COUNT(*) AS count FROM courses WHERE code = ?";
    const [checkResult] = await dbInstance.execute(checkQuery, [courseCode]);

    if (checkResult[0].count > 0) {
      return { success: false, message: "Course code already exists" };
    }

    const query =
      "INSERT INTO courses (name, code, created_by) VALUES (?, ?, ?)";
    const [rows] = await dbInstance.execute(query, [
      courseName,
      courseCode,
      teacherId,
    ]);

    return rows.affectedRows > 0
      ? {
          success: true,
          message: "Course added successfully",
          courseId: rows.insertId,
        }
      : { success: false, message: "Failed to add course" };
  },

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
      const updateQuery =
        "UPDATE teachers SET exam_ids = JSON_ARRAY_APPEND(exam_ids, '$', ?) WHERE id = ?";
      await dbInstance.execute(updateQuery, [rows.insertId, teacherId]);
      return {
        success: true,
        message: "Exam created successfully",
        examId: rows.insertId,
      };
    } else {
      return { success: false, message: "Failed to create exam" };
    }
  },

  // Assign students to an exam
  assignStudentsToExam: async (examId, studentIds) => {
    // Convert studentIds array to a JSON string
    const studentIdsJSON = JSON.stringify(studentIds);

    // Update exam table to include assigned students
    const query = "UPDATE exams SET assigned_students = ? WHERE id = ?";
    const [rows] = await dbInstance.execute(query, [studentIdsJSON, examId]);

    return rows.affectedRows > 0
      ? { success: true, message: "Students assigned to exam successfully" }
      : { success: false, message: "Failed to assign students to exam" };
  },

  // Add question to an exam (with optional image)
  addQuestionToExam: async (
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
  ) => {
    const insertQuestionQuery = `INSERT INTO questions (course_id, created_by, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, image_url) 
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [questionRows] = await dbInstance.execute(insertQuestionQuery, [
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
    ]);

    if (questionRows.affectedRows > 0) {
      const questionId = questionRows.insertId;
      const updateExamQuery =
        "UPDATE exams SET question_ids = JSON_ARRAY_APPEND(question_ids, '$', ?) WHERE id = ?";
      await dbInstance.execute(updateExamQuery, [questionId, examId]);

      return {
        success: true,
        message: "Question added successfully",
        questionId,
      };
    } else {
      return { success: false, message: "Failed to add question" };
    }
  },

  // View exam results (for all students in an exam)
  getExamResults: async (examId) => {
    const query = `SELECT s.user_id, u.username, er.total_score, er.status
                   FROM exam_results er
                   JOIN students s ON er.student_id = s.id
                   JOIN users u ON s.user_id = u.id
                   WHERE er.exam_id = ?`;
    const [rows] = await dbInstance.execute(query, [examId]);
    return rows;
  },

  // Get results for a specific student
  getStudentResults: async (studentId) => {
    const query = `SELECT er.exam_id, e.title, e.total_marks, er.total_score, er.status
                   FROM exam_results er
                   JOIN exams e ON er.exam_id = e.id
                   WHERE er.student_id = ?`;
    const [rows] = await dbInstance.execute(query, [studentId]);
    return rows;
  },

  // Update an existing question (including image URL)
  updateQuestion: async (
    questionId,
    questionText,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
    difficulty,
    imageUrl
  ) => {
    const query = `UPDATE questions 
                   SET question_text = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_option = ?, difficulty = ?, image_url = ?
                   WHERE id = ?`;
    const [rows] = await dbInstance.execute(query, [
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      difficulty,
      imageUrl,
      questionId,
    ]);

    return rows.affectedRows > 0
      ? { success: true, message: "Question updated successfully" }
      : { success: false, message: "Failed to update question" };
  },
};

export default Teacher;
