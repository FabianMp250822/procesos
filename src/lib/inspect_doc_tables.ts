import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.execute('DESCRIBE pretension_documento');
    console.log(JSON.stringify(rows, null, 2));
    
    console.log("--- inv_documen ---");
    const [rows2] = await connection.execute('DESCRIBE inv_documen');
    console.log(JSON.stringify(rows2, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}
run();
