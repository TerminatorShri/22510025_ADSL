import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json(new ApiError(400, "Username and password are required"));
    }

    const user = await User.findByUsername(username);

    if (!user) {
      return res
        .status(401)
        .json(new ApiError(401, "Invalid username or password"));
    }

    // Compare hashed password with the provided password
    // const isMatch = bcrypt.compareSync(password, user.password);
    const isMatch = password == user.password;
    if (!isMatch) {
      return res
        .status(401)
        .json(new ApiError(401, "Invalid username or password"));
    }

    // Store role_id in an HttpOnly cookie
    res.cookie("role_id", user.role_id, {
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      sameSite: "Strict", // Prevent CSRF attacks
    });

    return res.status(200).json(new ApiResponse(200, user, "Login successful"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const changeUserName = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username } = req.body;

    const result = await User.changeUserName(userId, username);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res.status(200).json(new ApiResponse(200, null, result.message));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    const result = await User.changePassword(userId, password);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res.status(200).json(new ApiResponse(200, null, result.message));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Server error", [], error.stack));
  }
};
