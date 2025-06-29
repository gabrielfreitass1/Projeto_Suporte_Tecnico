// conexão com o banco
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
//console.log('DATABASE_URL:', process.env.DATABASE_URL);

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  
});

pool.on('error', (err, client) => {
    console.log('Erro de conexão!', err);
    process.exit(-1);
});

pool.on('connect', () => {
    console.log('DB conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
