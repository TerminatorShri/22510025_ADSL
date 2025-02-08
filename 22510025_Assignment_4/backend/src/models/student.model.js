import dbInstance from "../config/mysql.config.js";

const Student = {
  // Get unattempted exams for a student
  getUnattemptedExams: async (studentId) => {
    const query = `
        SELECT e.id, e.title, e.description, e.total_marks, e.start_time, e.duration_minutes, e.status
        FROM exams e
        WHERE JSON_CONTAINS(e.assigned_students, CAST(? AS JSON), '$') 
        AND e.id NOT IN (
            SELECT exam_id FROM exam_results WHERE student_id = ?
        )`;

    const [rows] = await dbInstance.execute(query, [studentId, studentId]);
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
    const query = `
      SELECT q.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, 
             q.image_url, q.difficulty
      FROM questions q
      JOIN JSON_TABLE(
        (SELECT question_ids FROM exams WHERE id = ?), 
        '$[*]' COLUMNS(question_id INT PATH '$')
      ) AS qt ON q.id = qt.question_id
    `;
    const [rows] = await dbInstance.execute(query, [examId]);
    return rows;
  },

  // Submit all answers at once
  submitExamAnswers: async (attemptId, answers) => {
    let correctCount = 0;
    const totalQuestions = answers.length;

    // Insert answers & calculate correct count
    for (const answer of answers) {
      const { questionId, selectedOption } = answer;

      const answerQuery = "SELECT correct_option FROM questions WHERE id = ?";
      const [answerResult] = await dbInstance.execute(answerQuery, [
        questionId,
      ]);

      if (answerResult.length === 0) continue;

      const isCorrect = answerResult[0].correct_option === selectedOption;
      if (isCorrect) correctCount++;

      const query = `
        INSERT INTO student_answers (student_attempt_id, question_id, selected_option, is_correct)
        VALUES (?, ?, ?, ?)
      `;
      await dbInstance.execute(query, [
        attemptId,
        questionId,
        selectedOption,
        isCorrect,
      ]);
    }

    // Calculate score
    const examQuery = `
      SELECT e.id, e.total_marks
      FROM exams e
      JOIN student_exam_attempts sea ON e.id = sea.exam_id
      WHERE sea.id = ?
    `;
    const [examResult] = await dbInstance.execute(examQuery, [attemptId]);
    if (examResult.length === 0)
      return { success: false, message: "Exam not found" };

    const totalMarks = examResult[0].total_marks;
    const studentScore = Math.round(
      (correctCount / totalQuestions) * totalMarks
    );
    const passStatus = studentScore >= totalMarks * 0.4 ? "passed" : "failed";

    // Update exam attempt status
    const updateQuery = `
      UPDATE student_exam_attempts 
      SET status = 'completed', end_time = NOW(), score = ? 
      WHERE id = ?
    `;
    await dbInstance.execute(updateQuery, [studentScore, attemptId]);

    // Store result in exam_results
    const resultQuery = `
      INSERT INTO exam_results (student_id, exam_id, total_score, status)
      VALUES ((SELECT student_id FROM student_exam_attempts WHERE id = ?), ?, ?, ?)
    `;
    await dbInstance.execute(resultQuery, [
      attemptId,
      examResult[0].id,
      studentScore,
      passStatus,
    ]);

    return {
      success: true,
      message: "Exam submitted successfully",
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
