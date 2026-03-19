import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.execute('SHOW TABLES');
    const tables = rows.map(r => Object.values(r)[0]);
    console.log(JSON.stringify(tables, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}
run();
