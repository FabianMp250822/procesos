import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.execute('DESCRIBE procesos');
    console.log(JSON.stringify(rows, null, 2));
    
    const [rows2] = await connection.execute('DESCRIBE anotaciones');
    console.log("ANOTACIONES:");
    console.log(JSON.stringify(rows2, null, 2));

    const [rows3] = await connection.execute('DESCRIBE anexos');
    console.log("ANEXOS:");
    console.log(JSON.stringify(rows3, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}
run();
