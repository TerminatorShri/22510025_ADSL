import dbInstance from "../database/mysql.config.js";
import moment from "moment";

export const getTables = async (req, res) => {
  try {
    console.log("Fetching tables...");
    const [tables] = await dbInstance.query(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?",
      [process.env.DB_NAME]
    );
    const tableNames = tables.map((table) => table.TABLE_NAME);
    console.log("Fetched tables:", tableNames);
    res.json(tableNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch columns of a table
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

// Controller to fetch all data from a table
export const getData = async (req, res) => {
  try {
    const { tableName } = req.params;
    const [rows] = await dbInstance.query(`SELECT * FROM ${tableName}`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to insert a record into a table
export const createData = async (req, res) => {
  try {
    console.log("Creating data...");
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

// Controller to update a record in a table
export const updateData = async (req, res) => {
  try {
    const { tableName, id } = req.params;
    const data = req.body;

    // Convert date fields to the correct format
    const columns = Object.keys(data);
    const values = columns.map((key) => {
      if (key.toLowerCase().includes("date") && data[key]) {
        // Convert date to 'YYYY-MM-DD HH:MM:SS'
        return moment(data[key]).format("YYYY-MM-DD HH:mm:ss");
      }
      return data[key];
    });

    values.push(Number(id)); // Add the ID for the WHERE clause

    const updateSet = columns.map((col) => `${col} = ?`).join(", ");
    const query = `
      UPDATE ${tableName} 
      SET ${updateSet} 
      WHERE id = ?
    `;

    const [result] = await dbInstance.query(query, values);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a record from a table
export const deleteData = async (req, res) => {
  try {
    const { tableName, id } = req.params;
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    const [result] = await dbInstance.query(query, [Number(id)]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
