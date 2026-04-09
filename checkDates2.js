const mysql = require("mysql2/promise");
async function run() {
  const conn = await mysql.createConnection("mysql://u948052382_QT16p:D@justicia162804@srv439.hstgr.io:3306/u948052382_48yNH");
  const [rows] = await conn.execute(`
    SELECT COUNT(*) as count FROM anotaciones WHERE fecha_limite = '0'
  `);
  console.log('Count of 0:', rows[0].count);

  const [samples] = await conn.execute(`
    SELECT auto as id, fecha, fecha_limite, hora_limite, num_registro FROM anotaciones WHERE fecha_limite = '0' LIMIT 5
  `);
  console.log('Samples:', samples);

  process.exit(0);
}
run();
