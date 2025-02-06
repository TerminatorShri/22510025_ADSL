SELECT 
          d.dept_name,
          d.building,
          d.budget,
          COUNT(c.room_number) AS total_rooms,
          GROUP_CONCAT(DISTINCT c.room_number ORDER BY c.room_number ASC) AS room_numbers
      FROM department d
      LEFT JOIN classroom c ON d.building = c.building
      WHERE d.dept_name = 'Biology'
      GROUP BY d.dept_name, d.building, d.budget;
      
SELECT DISTINCT
    c.course_id,
    c.title AS course_title,
    c.credits,
    i.ID AS instructor_id,
    i.name AS instructor_name,
    i.salary
FROM course c
LEFT JOIN teaches t ON c.course_id = t.course_id  -- Get instructor ID from teaches table
LEFT JOIN instructor i ON t.ID = i.ID  -- Get instructor details
WHERE c.dept_name = 'Comp. Sci.';  -- Filter by department


