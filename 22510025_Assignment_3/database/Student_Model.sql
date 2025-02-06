SELECT 
    s.ID AS student_id,
    s.name AS student_name,
    s.dept_name,
    s.tot_cred,
    a.i_ID AS advisor_id,
    i.name AS advisor_name
FROM student s
LEFT JOIN advisor a ON s.ID = a.s_ID
LEFT JOIN instructor i ON a.i_ID = i.ID
WHERE s.ID = '00128';  -- Example student ID

SELECT 
    t.course_id,
    t.grade,
    c.title AS course_title,
    c.credits
FROM takes t
INNER JOIN course c ON t.course_id = c.course_id
WHERE t.ID = '00128' AND t.semester = 'Fall';  -- Example student ID

SELECT 
        sec.course_id,
        c.title AS course_title,
        ts.day,
        ts.start_time,
        ts.end_time,
        cl.room_number,
        cl.building AS building_name,  -- Adding building name
        i.name AS instructor_name  -- Adding instructor's name
    FROM takes t
    INNER JOIN section sec ON t.course_id = sec.course_id 
        AND t.semester = sec.semester
        AND t.year = sec.year
    INNER JOIN course c ON sec.course_id = c.course_id
    INNER JOIN timeslot ts ON sec.time_slot_id = ts.time_slot_id
    LEFT JOIN classroom cl ON sec.building = cl.building 
        AND sec.room_number = cl.room_number
    INNER JOIN teaches te ON sec.course_id = te.course_id 
        AND sec.sec_id = te.sec_id
        AND sec.semester = te.semester
        AND sec.year = te.year
    INNER JOIN instructor i ON te.ID = i.ID  -- Join with instructor table to get the instructor's name
    WHERE t.ID = 00128 
        AND sec.semester = 'Fall';

SELECT DISTINCT
    p.course_id, 
    c.title AS course_title,
    i.name AS instructor_name,
    c.credits,  -- Include credits for each course
    sec.sec_id,  -- Section ID from section table
    sec.semester, -- Semester from section table
    sec.year -- Year from section table
FROM prereq p
INNER JOIN takes t ON t.course_id = p.prereq_id  -- Find prerequisites the student has already taken
INNER JOIN course c ON p.course_id = c.course_id -- Get the details of the next eligible course
INNER JOIN teaches te ON te.course_id = c.course_id  -- Get the teaching assignment
INNER JOIN instructor i ON i.ID = te.ID   -- Get the instructor's name
INNER JOIN section sec ON sec.course_id = c.course_id -- Get section and semester details
WHERE t.ID = '00128'  -- Student ID
AND p.course_id NOT IN (  -- Exclude courses already taken by the student
    SELECT t.course_id
    FROM takes t
    WHERE t.ID = '00128'  -- Student ID
);

select * from takes;

use assignment3;








        




