import Admin from "../models/admin.model.js";
import { ApiResponse, ApiError } from "../config/api.config.js";

// Controller to add a new department
export const addDepartment = async (req, res) => {
  try {
    const { deptName, building, budget } = req.body;

    if (!deptName || !building || !budget) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await Admin.addDepartment(deptName, building, budget);
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Department added successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Controller to add a new building and room
export const addBuildingAndRoom = async (req, res) => {
  try {
    const { building, roomNumber, capacity } = req.body;

    if (!building || !roomNumber || !capacity) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const result = await Admin.addBuildingAndRoom(
      building,
      roomNumber,
      capacity
    );
    if (!result.success) {
      return res.status(400).json(new ApiError(400, result.message));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Building and room added successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};
