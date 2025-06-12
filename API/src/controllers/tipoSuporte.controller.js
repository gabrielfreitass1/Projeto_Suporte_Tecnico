const pool = require('../config/database');

// Criar tipo de suporte
exports.createTipoSuporte = async (req, res) => {
  const { descricao } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tipo_suporte (descricao) VALUES ($1) RETURNING *`,
      [descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar tipo de suporte' });
  }
};

// Listar todos
exports.listAllTipoSuporte = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tipo_suporte');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar tipo de suporte' });
  }
};

// Buscar por ID
exports.findTipoSuporteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tipo_suporte WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Tipo de suporte não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar tipo de suporte' });
  }
};

// Atualizar
exports.updateTipoSuporteById = async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tipo_suporte SET descricao = $1 WHERE id = $2 RETURNING *`,
      [descricao, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Tipo de suporte não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar tipo de suporte' });
  }
};

// Deletar
exports.deleteTipoSuporteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tipo_suporte WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Tipo de suporte não encontrado' });
    res.json({ mensagem: 'Tipo de suporte removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar tipo de suporte' });
  }
};
