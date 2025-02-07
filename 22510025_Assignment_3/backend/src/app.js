import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import studentRouter from "./routes/student.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import hodRouter from "./routes/hod.routes.js";
import adminRouter from "./routes/admin.routes.js";
import registrarRouter from "./routes/registrar.routes.js";
import { authorizeRole } from "./middlewares/auth.middleware.js";

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/user", userRouter);

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/instructor", teacherRouter);
app.use("/api/v1/hod", hodRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/registrar", registrarRouter);

export default app;
