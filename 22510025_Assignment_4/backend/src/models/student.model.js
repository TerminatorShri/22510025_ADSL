import dbInstance from "../config/mysql.config.js";

const Student = {
  // Get unattempted exams for a student
  getUnattemptedExams: async (userId) => {
    const query = `
        SELECT e.id, e.title, e.description, e.total_marks, e.start_time, e.duration_minutes, e.status
        FROM exams e
        WHERE JSON_CONTAINS(e.assigned_students, CAST(
                (SELECT id FROM students WHERE user_id = ?) AS JSON), '$'
            )
        AND e.id NOT IN (
            SELECT exam_id FROM exam_results WHERE student_id = (
                SELECT id FROM students WHERE user_id = ?
            )
        );
    `;

    const [rows] = await dbInstance.execute(query, [userId, userId]);
    return rows;
  },

  // Get attempted exams for a student
  getAttemptedExams: async (studentId) => {
    const query = `
      SELECT e.id, e.title, e.description, e.total_marks, e.start_time, e.duration_minutes, e.status, er.total_score, er.status AS result_status
      FROM exams e
      JOIN exam_results er ON e.id = er.exam_id
      WHERE er.student_id = (
          SELECT id FROM students WHERE user_id = ?
      );
    `;
    const [rows] = await dbInstance.execute(query, [studentId]);
    return rows;
  },

  // Start an exam when clicked on "Unattempted Exam"
  startExam: async (studentId, examId) => {
    const query = `
      INSERT INTO student_exam_attempts (student_id, exam_id, status, start_time)
      VALUES (?, ?, 'ongoing', NOW())
    `;
    const [rows] = await dbInstance.execute(query, [studentId, examId]);

    return rows.affectedRows > 0
      ? {
          success: true,
          message: "Exam started successfully",
          attemptId: rows.insertId,
        }
      : { success: false, message: "Failed to start exam" };
  },

  // Fetch exam questions after starting an exam
  getExamQuestions: async (examId) => {
    // Step 1: Fetch exam details and question_ids JSON array
    const queryFetchExamDetails = `
      SELECT title, total_marks, duration_minutes, start_time, status, JSON_LENGTH(question_ids) AS num_questions 
      FROM exams 
      WHERE id = ?`;

    const [examResult] = await dbInstance.execute(queryFetchExamDetails, [
      examId,
    ]);

    if (!examResult.length || examResult[0].num_questions === 0) {
      return { success: false, message: "No questions assigned", data: null };
    }

    const {
      title,
      total_marks,
      duration_minutes,
      start_time,
      status,
      num_questions,
    } = examResult[0];

    // Step 2: Dynamically build SQL query to extract question IDs
    let query = `
      SELECT q.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.image_url 
      FROM questions q 
      WHERE q.id IN (
    `;

    const unionParts = [];
    for (let i = 0; i < num_questions; i++) {
      unionParts.push(
        `SELECT JSON_UNQUOTE(JSON_EXTRACT(question_ids, '$[${i}]')) FROM exams WHERE id = ?`
      );
    }

    query += unionParts.join(" UNION ALL ") + ")";

    // Step 3: Execute the query with multiple placeholders for examId
    const [questions] = await dbInstance.execute(
      query,
      Array(num_questions).fill(examId)
    );

    return {
      success: true,
      message: "Exam questions retrieved successfully",
      examDetails: {
        title,
        total_marks,
        duration_minutes,
        start_time,
        status,
      },
      examQuestions: questions,
    };
  },

  // Submit all answers at once
  submitExamAnswers: async (attemptId, answers) => {
    if (!answers || answers.length === 0) {
      return { success: false, message: "No answers provided" };
    }

    let correctCount = 0;
    const totalQuestions = answers.length;

    // Get student_id from attemptId
    const studentIdQuery = `SELECT student_id FROM student_exam_attempts WHERE id = ?`;
    const [studentResult] = await dbInstance.execute(studentIdQuery, [
      attemptId,
    ]);
    if (studentResult.length === 0) {
      return { success: false, message: "Student attempt not found." };
    }
    const studentId = studentResult[0].student_id;

    // Fetch correct answers in one query
    const questionIds = answers.map((ans) => ans.question_id);
    const placeholders = questionIds.map(() => "?").join(", ");
    const answerQuery = `SELECT id, correct_option FROM questions WHERE id IN (${placeholders})`;
    const [correctAnswers] = await dbInstance.execute(answerQuery, questionIds);

    // Map correct answers for quick lookup
    const correctMap = new Map(
      correctAnswers.map((q) => [q.id, q.correct_option])
    );

    // Insert answers & calculate correct count
    for (const answer of answers) {
      const isCorrect =
        correctMap.get(answer.question_id) === answer.selected_option;
      if (isCorrect) correctCount++;

      const insertQuery = `
        INSERT INTO student_answers (student_attempt_id, question_id, selected_option, is_correct)
        VALUES (?, ?, ?, ?)
      `;
      await dbInstance.execute(insertQuery, [
        attemptId,
        answer.question_id,
        answer.selected_option,
        isCorrect,
      ]);
    }

    // Get total marks for the exam
    const examQuery = `
      SELECT e.id, e.total_marks FROM exams e
      JOIN student_exam_attempts sea ON e.id = sea.exam_id
      WHERE sea.id = ?
    `;
    const [examResult] = await dbInstance.execute(examQuery, [attemptId]);
    if (examResult.length === 0) {
      return { success: false, message: "Exam not found." };
    }

    const totalMarks = examResult[0].total_marks;
    const studentScore =
      totalQuestions > 0
        ? Math.round((correctCount / totalQuestions) * totalMarks)
        : 0;
    const passStatus = studentScore >= totalMarks * 0.4 ? "passed" : "failed";

    // Update attempt status
    const updateQuery = `
      UPDATE student_exam_attempts 
      SET status = 'completed', end_time = NOW(), score = ? 
      WHERE id = ?
    `;
    await dbInstance.execute(updateQuery, [studentScore, attemptId]);

    // Store result in exam_results
    const resultQuery = `
      INSERT INTO exam_results (student_id, exam_id, total_score, status)
      VALUES (?, ?, ?, ?)
    `;
    await dbInstance.execute(resultQuery, [
      studentId,
      examResult[0].id,
      studentScore,
      passStatus,
    ]);

    return {
      success: true,
      message: "✅ Exam submitted successfully",
      score: studentScore,
      status: passStatus,
    };
  },

  // Get attempted exam details, including marks & submitted answers
  getAttemptedQuestions: async (userId, examId) => {
    const query = `
      SELECT sa.question_id, sa.selected_option, sa.is_correct, 
             q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, 
             q.correct_option, q.image_url, q.difficulty,
             e.title AS exam_title, 
             e.total_marks AS exam_total_marks, 
             e.start_time AS exam_start_time, 
             e.duration_minutes AS exam_duration_minutes,
             c.name AS course_name, 
             c.code AS course_code
      FROM student_answers sa
      JOIN questions q ON sa.question_id = q.id
      JOIN student_exam_attempts sea ON sa.student_attempt_id = sea.id
      JOIN exams e ON sea.exam_id = e.id
      JOIN courses c ON e.course_id = c.id
      WHERE sea.student_id = (SELECT id FROM students WHERE user_id = ?) 
      AND sea.exam_id = ?;
    `;

    const [rows] = await dbInstance.execute(query, [userId, examId]);
    return rows;
  },
};

export default Student;
