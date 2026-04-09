const mysql = require("mysql2/promise");
async function run() {
  const conn = await mysql.createConnection("mysql://u948052382_QT16p:D@justicia162804@srv439.hstgr.io:3306/u948052382_48yNH");
  const [rows] = await conn.execute(`
    SELECT auto as id, fecha, fecha_limite, hora_limite FROM anotaciones WHERE num_registro = 4 ORDER BY auto DESC LIMIT 5
  `);
  console.log('Tasks:', rows);
  process.exit(0);
}
run();
