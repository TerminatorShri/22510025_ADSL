import dbInstance from "../config/mysql.config.js";

const User = {
  findByUsername: async (username) => {
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await dbInstance.execute(query, [username]);
    return rows.length > 0 ? rows[0] : null;
  },

  changeUserName: async (userId, username) => {
    // Check if the new username already exists
    const checkQuery = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
    const [checkResult] = await dbInstance.execute(checkQuery, [username]);

    if (checkResult[0].count > 0) {
      return { success: false, message: "Username already taken" };
    }

    // Update username
    const query = "UPDATE users SET username = ? WHERE id = ?";
    const [rows] = await dbInstance.execute(query, [username, userId]);

    return rows.affectedRows > 0
      ? { success: true, message: "Username updated successfully" }
      : { success: false, message: "Failed to update username" };
  },

  changePassword: async (userId, password) => {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    const [rows] = await dbInstance.execute(query, [password, userId]);

    return rows.affectedRows > 0
      ? { success: true, message: "Password updated successfully" }
      : { success: false, message: "Failed to update password" };
  },
};

export default User;
