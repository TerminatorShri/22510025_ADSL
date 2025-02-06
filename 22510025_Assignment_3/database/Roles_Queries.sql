USE assignment3;

-- First create roles with fixed IDs
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name ENUM('administrator', 'headOfDept', 'teacher', 'student')
);

-- Insert roles with specific IDs for reference
INSERT INTO roles (id, role_name) VALUES
    (1, 'administrator'),
    (2, 'headOfDept'),
    (3, 'teacher'),
    (4, 'student');

-- Create users table with simplified constraints
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    student_id VARCHAR(5),
    instructor_id VARCHAR(5),
    dept_name VARCHAR(20),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (student_id) REFERENCES student(ID),
    FOREIGN KEY (instructor_id) REFERENCES instructor(ID),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name),
    -- Using fixed role IDs in constraints
    CONSTRAINT check_student CHECK (
        (role_id = 4 AND student_id IS NOT NULL AND instructor_id IS NULL AND dept_name IS NULL) OR
        (role_id != 4)
    ),
    CONSTRAINT check_teacher CHECK (
        (role_id = 3 AND instructor_id IS NOT NULL AND student_id IS NULL AND dept_name IS NULL) OR
        (role_id != 3)
    ),
    CONSTRAINT check_hod CHECK (
        (role_id = 2 AND dept_name IS NOT NULL AND student_id IS NULL AND instructor_id IS NULL) OR
        (role_id != 2)
    ),
    CONSTRAINT check_admin CHECK (
        (role_id = 1 AND student_id IS NULL AND instructor_id IS NULL AND dept_name IS NULL) OR
        (role_id != 1)
    )
);

SELECT * FROM users;