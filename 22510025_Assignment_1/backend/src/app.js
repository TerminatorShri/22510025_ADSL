import express from "express";
import tableRouter from "./routes/table.routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1", tableRouter);

export default app;
