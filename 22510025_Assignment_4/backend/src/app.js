import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import studentRouter from "./routes/student.routes.js";

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/students", studentRouter);

export default app;
