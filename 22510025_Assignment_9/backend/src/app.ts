import express from "express";
import cors from "cors";
import databaseRoutes from "./routes/database.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", databaseRoutes);

export default app;
