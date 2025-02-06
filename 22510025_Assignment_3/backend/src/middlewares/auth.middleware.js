import User from "../models/user.model.js";
import { ApiError } from "../config/api.config.js";

export const authorizeRole = async (req, res, next) => {
  try {
    const userId = req.headers["user-id"]; // Extract userId from headers
    console.log("🚀 ~ authorizeRole ~ userId:", userId);
    const roleId = req.cookies.role_id; // Extract roleId from cookies

    console.log("inside middle", userId, roleId);

    if (!userId || !roleId) {
      return res
        .status(400)
        .json(new ApiError(400, "User ID and Role ID are required"));
    }

    // Call checkRole function to get the actual role from the database
    const dbRoleId = await User.checkRole(userId);

    if (!dbRoleId) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    // Compare role_id from cookies with database role_id
    if (parseInt(dbRoleId) !== parseInt(roleId)) {
      return res
        .status(403)
        .json(new ApiError(403, "Access Denied: Role mismatch"));
    }

    // Role matches, proceed to next middleware or route handler
    next();
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};
