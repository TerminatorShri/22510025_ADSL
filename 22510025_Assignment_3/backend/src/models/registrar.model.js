import dbInstance from "../config/mysql.config.js";

const Registrar = {
  // 1) Add a new student
  addStudent: async (studentId, name, deptName) => {
    const query = `
      INSERT INTO student (ID, name, dept_name, tot_cred)
      VALUES (?, ?, ?, 0);
    `;
    const [result] = await dbInstance.execute(query, [
      studentId,
      name,
      deptName,
    ]);

    return result.affectedRows > 0
      ? { success: true, message: "Student added successfully" }
      : { success: false, message: "Failed to add student" };
  },

  // 2) Get new courses for a department that have not been assigned a time slot
  getNewCoursesWithoutTimeSlot: async () => {
    const query = `
      SELECT c.course_id, c.title AS course_title, c.credits
      FROM course c
      LEFT JOIN section s ON c.course_id = s.course_id
      WHERE s.course_id IS NULL;
    `;
    const [rows] = await dbInstance.execute(query);
    return rows.length > 0 ? rows : null;
  },

  // 3) Add or update a time slot for a course
  updateTimeSlotForCourse: async (
    courseId,
    secId,
    semester,
    year,
    timeSlotId,
    day,
    startTime,
    endTime,
    building,
    roomNumber
  ) => {
    // Check for conflicts in the same department and building
    const checkConflictQuery = `
      SELECT 1
      FROM section s
      JOIN timeslot t ON s.time_slot_id = t.time_slot_id
      WHERE s.course_id = ? 
        AND s.semester = ? 
        AND s.year = ? 
        AND s.building = ? 
        AND s.room_number = ?
        AND t.day = ?
        AND (t.start_time < ? AND t.end_time > ?)  -- Check for overlapping time
      LIMIT 1;
    `;
    const [conflictRows] = await dbInstance.execute(checkConflictQuery, [
      courseId,
      semester,
      year,
      building,
      roomNumber,
      day,
      endTime,
      startTime,
    ]);

    if (conflictRows.length > 0) {
      return { success: false, message: "Conflict with existing time slot" };
    }

    // If no conflict, proceed to insert or update time slot and section
    const insertTimeSlotQuery = `
      INSERT INTO timeslot (time_slot_id, day, start_time, end_time)
      VALUES (?, ?, ?, ?);
    `;
    await dbInstance.execute(insertTimeSlotQuery, [
      timeSlotId,
      day,
      startTime,
      endTime,
    ]);

    const updateSectionQuery = `
      INSERT INTO section (course_id, sec_id, semester, year, time_slot_id, building, room_number)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE time_slot_id = ?, building = ?, room_number = ?;
    `;
    const [result] = await dbInstance.execute(updateSectionQuery, [
      courseId,
      secId,
      semester,
      year,
      timeSlotId,
      building,
      roomNumber,
      timeSlotId,
      building,
      roomNumber,
    ]);

    return result.affectedRows > 0
      ? { success: true, message: "Time slot updated successfully" }
      : { success: false, message: "Failed to update time slot" };
  },
};

export default Registrar;
