-- CREATE DATABASE assignment3;
-- USE assignment3;

CREATE TABLE classroom (
    building VARCHAR(15),
    room_number VARCHAR(7),
    capacity INT,
    PRIMARY KEY (building, room_number)
);

CREATE TABLE department (
    dept_name VARCHAR(20),
    building VARCHAR(15),
    budget DECIMAL(12,2) CHECK (budget > 0),
    PRIMARY KEY (dept_name)
);

CREATE TABLE course (
    course_id VARCHAR(8),
    title VARCHAR(50),
    dept_name VARCHAR(20),
    credits INT CHECK (credits > 0),
    PRIMARY KEY (course_id),
    CONSTRAINT fk_course_department FOREIGN KEY (dept_name) 
        REFERENCES department(dept_name) ON DELETE SET NULL
);

CREATE TABLE instructor (
    ID VARCHAR(5),
    name VARCHAR(20) NOT NULL,
    dept_name VARCHAR(20),
    salary DECIMAL(8,2) CHECK (salary > 29000),
    PRIMARY KEY (ID),
    CONSTRAINT fk_instructor_department FOREIGN KEY (dept_name) 
        REFERENCES department(dept_name) ON DELETE SET NULL
);

CREATE TABLE section (
    course_id VARCHAR(8),
    sec_id VARCHAR(8),
    semester ENUM('Fall', 'Winter', 'Spring', 'Summer'),
    year INT CHECK (year > 1701 AND year < 2100),
    building VARCHAR(15),
    room_number VARCHAR(7),
    time_slot_id VARCHAR(4),
    PRIMARY KEY (course_id, sec_id, semester, year),
    CONSTRAINT fk_section_course FOREIGN KEY (course_id) 
        REFERENCES course(course_id) ON DELETE CASCADE,
    CONSTRAINT fk_section_classroom FOREIGN KEY (building, room_number) 
        REFERENCES classroom(building, room_number) ON DELETE SET NULL
);

CREATE TABLE teaches (
    ID VARCHAR(5),
    course_id VARCHAR(8),
    sec_id VARCHAR(8),
    semester ENUM('Fall', 'Winter', 'Spring', 'Summer'),
    year INT,
    PRIMARY KEY (ID, course_id, sec_id, semester, year),
    CONSTRAINT fk_teaches_section FOREIGN KEY (course_id, sec_id, semester, year) 
        REFERENCES section(course_id, sec_id, semester, year) ON DELETE CASCADE,
    CONSTRAINT fk_teaches_instructor FOREIGN KEY (ID) 
        REFERENCES instructor(ID) ON DELETE CASCADE
);

CREATE TABLE student (
    ID VARCHAR(5),
    name VARCHAR(20) NOT NULL,
    dept_name VARCHAR(20),
    tot_cred INT CHECK (tot_cred >= 0),
    PRIMARY KEY (ID),
    CONSTRAINT fk_student_department FOREIGN KEY (dept_name) 
        REFERENCES department(dept_name) ON DELETE SET NULL
);

CREATE TABLE takes (
    ID VARCHAR(5),
    course_id VARCHAR(8),
    sec_id VARCHAR(8),
    semester ENUM('Fall', 'Winter', 'Spring', 'Summer'),
    year INT,
    grade VARCHAR(2),
    PRIMARY KEY (ID, course_id, sec_id, semester, year),
    CONSTRAINT fk_takes_section FOREIGN KEY (course_id, sec_id, semester, year) 
        REFERENCES section(course_id, sec_id, semester, year) ON DELETE CASCADE,
    CONSTRAINT fk_takes_student FOREIGN KEY (ID) 
        REFERENCES student(ID) ON DELETE CASCADE
);

CREATE TABLE advisor (
    s_ID VARCHAR(5),
    i_ID VARCHAR(5),
    PRIMARY KEY (s_ID),
    CONSTRAINT fk_advisor_instructor FOREIGN KEY (i_ID) 
        REFERENCES instructor(ID) ON DELETE SET NULL,
    CONSTRAINT fk_advisor_student FOREIGN KEY (s_ID) 
        REFERENCES student(ID) ON DELETE CASCADE
);

CREATE TABLE prereq (
    course_id VARCHAR(8),
    prereq_id VARCHAR(8),
    PRIMARY KEY (course_id, prereq_id),
    CONSTRAINT fk_prereq_course FOREIGN KEY (course_id) 
        REFERENCES course(course_id) ON DELETE CASCADE,
    CONSTRAINT fk_prereq_prereq FOREIGN KEY (prereq_id) 
        REFERENCES course(course_id)
);

CREATE TABLE timeslot (
    time_slot_id VARCHAR(4),
    day ENUM('M', 'T', 'W', 'R', 'F', 'S', 'U'),
    start_time TIME,
    end_time TIME,
    PRIMARY KEY (time_slot_id, day, start_time)
);

