import { Router } from "express";
import { getTables, getColumns, getData, createData, updateData, deleteData } from "../controller/table.controller.js";

const router = Router();

router.get("/tables", getTables);
router.get("/tables/:tableName/columns", getColumns);
router.get("/:tableName", getData);
router.post("/:tableName", createData);
router.put("/:tableName/:id", updateData);
router.delete("/:tableName/:id", deleteData);

export default router;
