const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro na conexão:', err.message);
  } else {
    console.log('✅ Conexão bem-sucedida! Hora do BD:', res.rows[0].now);
  }
  pool.end();
});