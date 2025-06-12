const pool = require('../config/database');

// Criar tipo de status
exports.createTipoStatus = async (req, res) => {
  const { descricao } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tipo_status (descricao) VALUES ($1) RETURNING *`,
      [descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar tipo de status' });
  }
};

// Listar todos
exports.listAllTipoStatus = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tipo_status');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar tipo de status' });
  }
};

// Buscar por ID
exports.findTipoStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tipo_status WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Tipo de status não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar tipo de status' });
  }
};

// Atualizar
exports.updateTipoStatusById = async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tipo_status SET descricao = $1 WHERE id = $2 RETURNING *`,
      [descricao, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Tipo de status não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar tipo de status' });
  }
};

// Deletar
exports.deleteTipoStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tipo_status WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Tipo de status não encontrado' });
    res.json({ mensagem: 'Tipo de status removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar tipo de status' });
  }
};
