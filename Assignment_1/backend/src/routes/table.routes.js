import { Router } from "express";
import {
  getTables,
  getColumns,
  getData,
  createData,
  updateData,
  deleteData,
  getPrimaryKey,
  executeQuery,
} from "../controller/table.controller.js";

const router = Router();

router.get("/tables", getTables);
router.get("/tables/:tableName/columns", getColumns);
router.get("/:tableName", getData);
router.get("/:tableName/primary-key", getPrimaryKey);
router.post("/:tableName", createData);
router.put("/:tableName", updateData);
router.delete("/:tableName", deleteData);
router.post("/execute-query", executeQuery);

export default router;
