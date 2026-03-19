const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env" });
require("dotenv").config({ path: ".env.local" });

async function discoverSchema() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not found");
    return;
  }
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
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
