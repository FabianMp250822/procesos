import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

async function discoverSchema() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  
  try {
    const [rows] = await connection.execute("DESCRIBE archivo_carpetas");
    console.log("Columns in archivo_carpetas:");
    rows.forEach(row => {
      console.log(`- ${row.Field} (${row.Type}) ${row.Key === 'PRI' ? '[PRIMARY KEY]' : ''}`);
    });
  } catch (error) {
    console.error("Discovery failed:", error.message);
  } finally {
    await connection.end();
  }
}

discoverSchema();
