import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.execute("SHOW TABLES LIKE '%doc%'");
    console.log(JSON.stringify(rows, null, 2));
    
    const [rows2] = await connection.execute("SHOW TABLES LIKE '%pension%'");
    console.log("PENSION TABLES:");
    console.log(JSON.stringify(rows2, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}
run();
