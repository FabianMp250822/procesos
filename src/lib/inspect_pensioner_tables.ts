import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    console.log("--- inv_documen ---");
    const [rows1] = await connection.execute('DESCRIBE inv_documen');
    console.log(JSON.stringify(rows1, null, 2));
    
    console.log("--- documento ---");
    const [rows2] = await connection.execute('DESCRIBE documento');
    console.log(JSON.stringify(rows2, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}
run();
