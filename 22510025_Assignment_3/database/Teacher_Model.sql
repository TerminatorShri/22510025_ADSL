SELECT 
              i.ID AS teacher_id,
              i.name AS teacher_name,
              i.dept_name,
              i.salary,
              c.course_id,
              c.title AS course_title,
              c.credits,
              te.semester,
              te.year
          FROM instructor i
          LEFT JOIN teaches te ON i.ID = te.ID
          LEFT JOIN course c ON te.course_id = c.course_id
          WHERE i.ID = '10101';
          
SELECT 
          sec.course_id,
          c.title AS course_title,
          sec.semester,
          sec.year,
          cl.building AS building_name,
          cl.room_number,
          ts.day,
          ts.start_time,
          ts.end_time
      FROM teaches te
      INNER JOIN section sec ON te.course_id = sec.course_id 
          AND te.sec_id = sec.sec_id
          AND te.semester = sec.semester
          AND te.year = sec.year
      INNER JOIN course c ON sec.course_id = c.course_id
      LEFT JOIN classroom cl ON sec.building = cl.building 
          AND sec.room_number = cl.room_number
      INNER JOIN timeslot ts ON sec.time_slot_id = ts.time_slot_id
      WHERE te.ID = '10101'
          AND sec.semester = 'Fall';
		
SELECT 
          t.ID AS student_id,
          s.name AS student_name,
          t.course_id,
          c.title AS course_title,
          t.semester,
          t.year,
          t.grade
      FROM teaches te
      INNER JOIN takes t ON te.course_id = t.course_id 
          AND te.sec_id = t.sec_id
          AND te.semester = t.semester
          AND te.year = t.year
      INNER JOIN student s ON t.ID = s.ID
      INNER JOIN course c ON t.course_id = c.course_id
      WHERE te.ID = '10101';
      
