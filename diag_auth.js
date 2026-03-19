const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function diagnostic() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not found");
    process.exit(1);
  }

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const [rows] = await connection.execute("SELECT usuario, pass, nivel FROM usuarios WHERE usuario = 'ADMINISTRADOR' OR usuario = 'admin'");
    
    console.log("Diagnostic Result:");
    console.log(JSON.stringify(rows, null, 2));

    if (rows.length === 0) {
      const [all] = await connection.execute("SELECT usuario FROM usuarios LIMIT 10");
      console.log("No user found. First 10 users:", all.map(u => u.usuario));
    }
    
    await connection.end();
  } catch (err) {
    console.error("Diagnostic Error:", err);
  }
}

diagnostic();
