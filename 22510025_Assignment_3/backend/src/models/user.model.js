import dbInstance from "../config/mysql.config.js";

const User = {
  findByUsername: async (username) => {
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await dbInstance.execute(query, [username]);
    return rows.length > 0 ? rows[0] : null;
  },

  checkRole: async (userId) => {
    const query = "SELECT role_id FROM users WHERE id = ?";
    const [rows] = await dbInstance.execute(query, [userId]);
    return rows.length > 0 ? rows[0].role_id : null;
  },

  changeUserName: async (userId, username) => {
    // First, check if the new username already exists
    const checkQuery = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
    const [checkResult] = await dbInstance.execute(checkQuery, [username]);

    if (checkResult[0].count > 0) {
      // If the username already exists, return a failure
      return { success: false, message: "Username already taken" };
    }

    // Proceed to update the username if it doesn't exist
    const query = "UPDATE users SET username = ? WHERE id = ?";
    const [rows] = await dbInstance.execute(query, [username, userId]);

    if (rows.affectedRows > 0) {
      return { success: true, message: "Username updated successfully" };
    } else {
      return { success: false, message: "Failed to update username" };
    }
  },

  changePassword: async (userId, password) => {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    const [rows] = await dbInstance.execute(query, [password, userId]);

    if (rows.affectedRows > 0) {
      return { success: true, message: "Password updated successfully" };
    } else {
      return { success: false, message: "Failed to update password" };
    }
  },
};

export default User;
