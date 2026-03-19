import mysql from 'mysql2/promise';

async function checkSchema() {
  const connection = await mysql.createConnection({
    host: 'srv439.hstgr.io',
    user: 'u948052382_QT16p',
    password: 'D@justicia162804',
    database: 'u948052382_48yNH',
  });

  const tables = ['inv_documen', 'documento'];
  for (const table of tables) {
    try {
      console.log(`--- ${table.toUpperCase()} SCHEMA ---`);
      const [schema] = await connection.query(`DESCRIBE ${table}`);
      console.log(JSON.stringify(schema, null, 2));
    } catch (e) {
      console.log(`Table ${table} error:`, e.message);
    }
  }
  
  await connection.end();
}

checkSchema().catch(console.error);
