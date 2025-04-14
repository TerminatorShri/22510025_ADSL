import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

const testConnection = async () => {
  const session = driver.session({ database: process.env.NEO4J_DATABASE });
  try {
    await session.run("RETURN 1");
    console.log("✅ Connected to Neo4j database:", process.env.NEO4J_DATABASE);
  } catch (error) {
    console.error("❌ Failed to connect to Neo4j:", error.message);
    process.exit(1); 
  } finally {
    await session.close();
  }
};

await testConnection();

export default driver;
