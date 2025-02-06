import dbInstance from "../config/mysql.config.js";

const Admin = {
  addDepartment: async (deptName, building, budget) => {
    const query = `
          INSERT INTO department (dept_name, building, budget) 
          VALUES (?, ?, ?);
        `;
    const [result] = await dbInstance.execute(query, [
      deptName,
      building,
      budget,
    ]);

    return result.affectedRows > 0
      ? { success: true, message: "Department added successfully" }
      : { success: false, message: "Failed to add department" };
  },

  // 2) Add a new building and room with capacity
  addBuildingAndRoom: async (building, roomNumber, capacity) => {
    const query = `
          INSERT INTO classroom (building, room_number, capacity) 
          VALUES (?, ?, ?);
        `;
    const [result] = await dbInstance.execute(query, [
      building,
      roomNumber,
      capacity,
    ]);

    return result.affectedRows > 0
      ? { success: true, message: "Building and room added successfully" }
      : { success: false, message: "Failed to add building and room" };
  },
};

export default Admin;
