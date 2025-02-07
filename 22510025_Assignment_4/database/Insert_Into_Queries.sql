INSERT INTO users (id, username, password, role) VALUES
(1, 'teacher_john', 'hashed_password_1', 'teacher'),
(2, 'teacher_emma', 'hashed_password_2', 'teacher'),
(3, 'student_alex', 'hashed_password_3', 'student'),
(4, 'student_sophia', 'hashed_password_4', 'student');

INSERT INTO teachers (id, user_id, exam_ids) VALUES
(1, 1, '[1, 2]'),
(2, 2, '[3]');

INSERT INTO students (id, user_id, enrolled_exams, marks) VALUES
(1, 3, '[1, 2]', '{"1": 85, "2": 90}'),
(2, 4, '[1, 3]', '{"1": 78, "3": 88}');

INSERT INTO courses (id, name, code, created_by) VALUES
(1, 'Mathematics', 'MATH101', 1),
(2, 'Computer Science', 'CS101', 2);

INSERT INTO exams (id, course_id, created_by, title, description, total_marks, start_time, duration_minutes, question_ids, assigned_students, status) VALUES
(1, 1, 1, 'Math Exam 1', 'Basic Algebra & Geometry', 100, '2025-02-10 10:00:00', 60, '[1, 2, 3, 4]', '[1, 2]', 'upcoming'),
(2, 1, 1, 'Math Exam 2', 'Advanced Algebra', 100, '2025-02-15 10:00:00', 90, '[5, 6, 7, 8]', '[1]', 'upcoming'),
(3, 2, 2, 'CS Exam 1', 'Introduction to Programming', 100, '2025-02-20 14:00:00', 75, '[9, 10, 11, 12]', '[2]', 'upcoming');

INSERT INTO questions (id, course_id, created_by, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty) VALUES
(1, 1, 1, 'What is 2 + 2?', '3', '4', '5', '6', 'B', 'easy'),
(2, 1, 1, 'Solve: 3x = 12, x = ?', '2', '3', '4', '5', 'C', 'easy'),
(3, 1, 1, 'Find the area of a circle with radius 5', '25π', '10π', '20π', '5π', 'A', 'medium'),
(4, 1, 1, 'What is the derivative of x^2?', '2x', 'x^2', 'x', 'x+1', 'A', 'medium'),
(5, 2, 2, 'What is an algorithm?', 'A programming language', 'A set of instructions', 'A data structure', 'A compiler', 'B', 'easy'),
(6, 2, 2, 'What does HTML stand for?', 'Hypertext Markup Language', 'Hyper Transfer Markup Language', 'High Tech Markup Language', 'None of the above', 'A', 'easy');

INSERT INTO student_exam_attempts (id, student_id, exam_id, status, start_time, end_time, score) VALUES
(1, 1, 1, 'completed', '2025-02-10 10:00:00', '2025-02-10 11:00:00', 85),
(2, 2, 1, 'completed', '2025-02-10 10:00:00', '2025-02-10 11:00:00', 78),
(3, 1, 2, 'completed', '2025-02-15 10:00:00', '2025-02-15 11:30:00', 90),
(4, 2, 3, 'completed', '2025-02-20 14:00:00', '2025-02-20 15:15:00', 88);

INSERT INTO student_answers (id, student_attempt_id, question_id, selected_option, is_correct) VALUES
(1, 1, 1, 'B', TRUE),
(2, 1, 2, 'C', TRUE),
(3, 1, 3, 'A', TRUE),
(4, 1, 4, 'B', FALSE), -- Incorrect answer
(5, 2, 1, 'B', TRUE),
(6, 2, 2, 'C', TRUE),
(7, 2, 3, 'A', FALSE), -- Incorrect answer
(8, 2, 4, 'A', TRUE);

INSERT INTO exam_results (id, student_id, exam_id, total_score, status) VALUES
(1, 1, 1, 85, 'passed'),
(2, 2, 1, 78, 'passed'),
(3, 1, 2, 90, 'passed'),
(4, 2, 3, 88, 'passed');

select * from questions;







