USE assignment3;

SELECT * FROM users;

SELECT * FROM roles;

INSERT INTO users (username, password, role_id, student_id, instructor_id, dept_name)
VALUES ('zhang_00128', '00128', 4, '00128', NULL, NULL);

INSERT INTO users (username, password, role_id, instructor_id, student_id, dept_name)
VALUES ('shri_10101', '10101', 3, '10101', NULL, NULL);

INSERT INTO users (username, password, role_id, instructor_id, student_id, dept_name)
VALUES ('hod_compsci', 'hodcse', 2, NULL, NULL, 'Comp. Sci.');

INSERT INTO users (username, password, role_id, instructor_id, student_id, dept_name)
VALUES ('adminUser', 'admin1234', 1, NULL, NULL, NULL);

INSERT INTO users (username, password, role_id, instructor_id, student_id, dept_name)
VALUES ('regUser', 'reg1234', 5, NULL, NULL, NULL);