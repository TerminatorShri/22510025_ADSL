import express from "express";
import cors from "cors";
import paperRouter from "./routes/paper.routes.js";
import driver from "./database/neo4j.js"; // 👈 Import the Neo4j driver instance

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.neo4jSession = driver.session({ database: process.env.NEO4J_DATABASE });
  next();
});

app.use("/api/papers", paperRouter);

export default app;
