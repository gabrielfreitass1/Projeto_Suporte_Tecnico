const pool = require('../config/database');
const bcrypt = require('bcrypt');

// Criar usuário
exports.createUsuario = async (req, res) => {
  const { nome, cpf, email, senha, sexo, nivel_tecnico } = req.body;

  try {
    const senha_hash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      `INSERT INTO usuario (nome, cpf, email, senha_hash, sexo, nivel_tecnico)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nome, cpf, email, senha_hash, sexo, nivel_tecnico]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};

// Listar todos
exports.listAllUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nome, email, cpf, sexo, nivel_tecnico FROM usuario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};

// Buscar por ID
exports.findUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, nome, email, cpf, sexo, nivel_tecnico FROM usuario WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
};

// Atualizar
exports.updateUsuarioById = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, senha, sexo, nivel_tecnico } = req.body;

  try {
    let senha_hash = null;
    if (senha) senha_hash = await bcrypt.hash(senha, 10);

    const query = `
      UPDATE usuario SET
        nome = $1,
        cpf = $2,
        email = $3,
        senha_hash = COALESCE($4, senha_hash),
        sexo = $5,
        nivel_tecnico = $6
      WHERE id = $7
      RETURNING id, nome, email, cpf, sexo, nivel_tecnico
    `;

    const values = [nome, cpf, email, senha_hash, sexo, nivel_tecnico, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
};

// Deletar
exports.deleteUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ mensagem: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
};
