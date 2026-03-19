import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.execute('DESCRIBE parametros');
    console.log(JSON.stringify(rows, null, 2));
    
    const [rows2] = await connection.execute('SELECT * FROM parametros LIMIT 20');
    console.log("PARAMETROS CONTENT:");
    console.log(JSON.stringify(rows2, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}
run();
