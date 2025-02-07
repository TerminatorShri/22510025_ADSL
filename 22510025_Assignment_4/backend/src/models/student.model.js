import dbInstance from "../config/mysql.config.js";

const Student = {
  // Get all assigned exams for a student
  getAssignedExams: async (studentId) => {
    const query = `SELECT e.id, e.title, e.description, e.total_marks, e.start_time, e.duration_minutes, e.status
                   FROM exams e
                   WHERE JSON_CONTAINS(e.assigned_students, ?, '$')`;
    const [rows] = await dbInstance.execute(query, [studentId]);
    return rows;
  },

  // Start an exam attempt
  startExam: async (studentId, examId) => {
    const query = `INSERT INTO student_exam_attempts (student_id, exam_id, status, start_time)
                   VALUES (?, ?, 'ongoing', NOW())`;
    const [rows] = await dbInstance.execute(query, [studentId, examId]);

    return rows.affectedRows > 0
      ? {
          success: true,
          message: "Exam started successfully",
          attemptId: rows.insertId,
        }
      : { success: false, message: "Failed to start exam" };
  },

  // Submit an answer for a question
  submitAnswer: async (attemptId, questionId, selectedOption) => {
    const answerQuery = "SELECT correct_option FROM questions WHERE id = ?";
    const [answerResult] = await dbInstance.execute(answerQuery, [questionId]);

    if (answerResult.length === 0) {
      return { success: false, message: "Invalid question ID" };
    }

    const isCorrect = answerResult[0].correct_option === selectedOption;

    const query = `INSERT INTO student_answers (student_attempt_id, question_id, selected_option, is_correct)
                   VALUES (?, ?, ?, ?)`;
    const [rows] = await dbInstance.execute(query, [
      attemptId,
      questionId,
      selectedOption,
      isCorrect,
    ]);

    return rows.affectedRows > 0
      ? { success: true, message: "Answer submitted successfully" }
      : { success: false, message: "Failed to submit answer" };
  },

  // Finish the exam and calculate score
  finishExam: async (attemptId) => {
    const scoreQuery = `SELECT COUNT(*) AS correct_answers 
                        FROM student_answers 
                        WHERE student_attempt_id = ? AND is_correct = 1`;
    const [scoreResult] = await dbInstance.execute(scoreQuery, [attemptId]);

    const correctAnswers = scoreResult[0].correct_answers;

    const examQuery = `SELECT e.id, e.total_marks, JSON_LENGTH(e.question_ids) AS total_questions
                       FROM exams e
                       JOIN student_exam_attempts sea ON e.id = sea.exam_id
                       WHERE sea.id = ?`;
    const [examResult] = await dbInstance.execute(examQuery, [attemptId]);

    if (examResult.length === 0) {
      return { success: false, message: "Exam not found" };
    }

    const exam = examResult[0];
    const totalMarks = exam.total_marks;
    const totalQuestions = exam.total_questions;
    const studentScore = Math.round(
      (correctAnswers / totalQuestions) * totalMarks
    );

    const updateQuery = `UPDATE student_exam_attempts 
                         SET status = 'completed', end_time = NOW(), score = ? 
                         WHERE id = ?`;
    const [updateResult] = await dbInstance.execute(updateQuery, [
      studentScore,
      attemptId,
    ]);

    if (updateResult.affectedRows > 0) {
      const resultQuery = `INSERT INTO exam_results (student_id, exam_id, total_score, status)
                           VALUES ((SELECT student_id FROM student_exam_attempts WHERE id = ?), ?, ?, ?)`;
      const passStatus = studentScore >= totalMarks * 0.4 ? "passed" : "failed";
      await dbInstance.execute(resultQuery, [
        attemptId,
        exam.id,
        studentScore,
        passStatus,
      ]);

      return {
        success: true,
        message: "Exam completed",
        score: studentScore,
        status: passStatus,
      };
    }

    return { success: false, message: "Failed to finish exam" };
  },

  // Get all results for a specific student
  getStudentResults: async (studentId) => {
    const query = `SELECT er.exam_id, e.title, e.total_marks, er.total_score, er.status, e.start_time
                   FROM exam_results er
                   JOIN exams e ON er.exam_id = e.id
                   WHERE er.student_id = ?`;
    const [rows] = await dbInstance.execute(query, [studentId]);
    return rows;
  },
};

export default Student;
