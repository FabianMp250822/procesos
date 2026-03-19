import mysql from 'mysql2/promise';

async function inspectLawyers() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.execute('DESCRIBE abogados');
    console.log(JSON.stringify(rows, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}

inspectLawyers();
