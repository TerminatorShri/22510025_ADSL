import dbInstance from "../database/mysql.config.js";

// Fetch table names
export const getTables = async (req, res) => {
  try {
    const [tables] = await dbInstance.query(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?",
      [process.env.DB_NAME]
    );
    const tableNames = tables.map((table) => table.TABLE_NAME);
    res.json(tableNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch column names for a specific table
export const getColumns = async (req, res) => {
  try {
    const { tableName } = req.params;
    const [columns] = await dbInstance.query(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?",
      [process.env.DB_NAME, tableName]
    );
    const columnNames = columns.map((column) => column.COLUMN_NAME);
    res.json(columnNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch data from a table
export const getData = async (req, res) => {
  try {
    const { tableName } = req.params;
    const [rows] = await dbInstance.query(`SELECT * FROM ${tableName}`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insert a record into a table
export const createData = async (req, res) => {
  try {
    const { tableName } = req.params;
    const data = req.body;

    const columns = Object.keys(data);
    const values = Object.values(data);

    const query = `
      INSERT INTO ${tableName} (${columns.join(", ")}) 
      VALUES (${columns.map(() => "?").join(", ")})
    `;

    const [result] = await dbInstance.query(query, values);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a record in a table
export const updateData = async (req, res) => {
  try {
    const { tableName } = req.params;
    const { primaryKey, primaryKeyValue, ...data } = req.body;

    if (!primaryKey || !primaryKeyValue) {
      return res
        .status(400)
        .json({ error: "Primary key and its value are required" });
    }

    const columns = Object.keys(data);
    const values = [...Object.values(data), primaryKeyValue];

    const updateSet = columns.map((col) => `${col} = ?`).join(", ");
    const query = `
      UPDATE ${tableName} 
      SET ${updateSet} 
      WHERE ${primaryKey} = ?
    `;

    const [result] = await dbInstance.query(query, values);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a record from a table
export const deleteData = async (req, res) => {
  try {
    const { tableName } = req.params;
    const { primaryKey, primaryKeyValue } = req.body;

    if (!primaryKey || !primaryKeyValue) {
      return res
        .status(400)
        .json({ error: "Primary key and its value are required" });
    }

    const query = `DELETE FROM ${tableName} WHERE ${primaryKey} = ?`;
    const [result] = await dbInstance.query(query, [primaryKeyValue]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPrimaryKeyInfo = async (req, res) => {
  try {
    const { tableName } = req.params;

    // Query to get primary key column and extra details (e.g., AUTO_INCREMENT)
    const [result] = await dbInstance.query(
      `SELECT COLUMN_NAME, EXTRA FROM information_schema.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_KEY = 'PRI'`,
      [process.env.DB_NAME, tableName]
    );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "Primary key not found for the table" });
    }

    const primaryKeyInfo = result.map((row) => ({
      columnName: row.COLUMN_NAME,
      isAutoIncrement: row.EXTRA.includes("auto_increment"),
    }));

    res.json({ primaryKeyInfo });
  } catch (error) {
    console.error("Error fetching primary key info:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const executeQuery = async (req, res) => {
  const { query } = req.body;

  try {
    const [result] = await db.query(query); // Execute the query
    res.status(200).json(result); // Send the result back
  } catch (error) {
    console.error("Error executing query:", error.message);
    res
      .status(400)
      .json({ error: "Invalid SQL Query", details: error.message });
  }
};
