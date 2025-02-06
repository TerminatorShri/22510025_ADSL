import dotenv from "dotenv";
import app from "./app.js";
import db from "./config/mysql.config.js";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 3000;

(async () => {
  try {
    await db.query("SELECT 1");
    console.log("Connected to the MySQL database!");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
})();

process.on("SIGINT", async () => {
  try {
    await db.end();
    console.log("Database connection closed.");
  } catch (err) {
    console.error("Error closing the database connection:", err.message);
  } finally {
    process.exit(0);
  }
});
