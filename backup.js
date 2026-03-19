require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function backup() {
  let connection;
  try {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not found");
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to database');

    const [tables] = await connection.query('SHOW TABLES');
    const tableNames = tables.map(t => Object.values(t)[0]);

    let sql = `-- DAJUSTICIA Database Backup (Node.js)\n`;
    sql += `-- Date: ${new Date().toISOString()}\n\n`;

    for (const table of tableNames) {
      console.log(`Backing up table: ${table}`);
      
      const [[createTable]] = await connection.query(`SHOW CREATE TABLE \`${table}\``);
      sql += `DROP TABLE IF EXISTS \`${table}\`;\n`;
      sql += createTable['Create Table'] + ';\n\n';

      const [rows] = await connection.query(`SELECT * FROM \`${table}\``);
      for (const row of rows) {
        const values = Object.values(row).map(val => {
          if (val === null) return 'NULL';
          if (typeof val === 'number') return val;
          return `'${val.toString().replace(/'/g, "''")}'`;
        }).join(', ');
        sql += `INSERT INTO \`${table}\` VALUES (${values});\n`;
      }
      sql += '\n\n';
    }

    const filename = `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`;
    const fullPath = path.join(__dirname, '..', filename);
    fs.writeFileSync(fullPath, sql);
    console.log(`Backup created at: ${fullPath}`);

  } catch (error) {
    console.error('Backup failed:', error);
  } finally {
    if (connection) await connection.end();
  }
}

backup();
