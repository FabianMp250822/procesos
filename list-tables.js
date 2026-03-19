const mysql = require("c:/Users/fabia/Downloads/private/next-app/node_modules/mysql2/promise");

async function listTables() {
  const connection = await mysql.createConnection("mysql://u948052382_QT16p:D@justicia162804@srv439.hstgr.io:3306/u948052382_48yNH");
  
  try {
    const [rows] = await connection.execute("SHOW TABLES");
    console.log("Tables in database:");
    rows.forEach(row => {
      console.log(`- ${Object.values(row)[0]}`);
    });
  } catch (error) {
    console.error("List tables failed:", error.message);
  } finally {
    await connection.end();
  }
}

listTables();
