const mysql = require("mysql2/promise");

async function discoverSchema() {
  const connection = await mysql.createConnection("mysql://u948052382_QT16p:D@justicia162804@srv439.hstgr.io:3306/u948052382_48yNH");
  
  const tables = ["anotaciones"];
  
  try {
    for (const table of tables) {
      const [rows] = await connection.execute(`DESCRIBE ${table}`);
      console.log(`Columns in ${table}:`);
      rows.forEach(row => {
        console.log(`- ${row.Field} (${row.Type}) ${row.Key === 'PRI' ? '[PRIMARY KEY]' : ''} ${row.Extra || ''}`);
      });
      console.log("");
    }
  } catch (error) {
    console.error("Discovery failed:", error.message);
  } finally {
    await connection.end();
  }
}

discoverSchema();
