const pool = require('../config/database');

async function existsInTable(table, id) {
  if (!id) return false;
  const result = await pool.query(`SELECT 1 FROM ${table} WHERE id = $1`, [id]);
  return result.rows.length > 0;
}

module.exports = { existsInTable };