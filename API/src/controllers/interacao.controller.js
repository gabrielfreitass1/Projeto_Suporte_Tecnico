const pool = require('../config/database');
const { existsInTable } = require('../utils/dbUtils');

// Criar interação
exports.createInteracao = async (req, res) => {
  const { id_chamado, id_tecnico, id_novo_tecnico, mensagem, tipo_interacao } = req.body;

  try {
    const chamadoExiste = await existsInTable('chamado', id_chamado);
    const tecnicoExiste = await existsInTable('usuario', id_tecnico);
    const novoTecnicoValido = !id_novo_tecnico || await existsInTable('usuario', id_novo_tecnico);

    if (!chamadoExiste) return res.status(400).json({ erro: 'Chamado não encontrado' });
    if (!tecnicoExiste) return res.status(400).json({ erro: 'Técnico responsável não encontrado' });
    if (!novoTecnicoValido) return res.status(400).json({ erro: 'Novo técnico não encontrado' });

    const result = await pool.query(`
      INSERT INTO interacao (
        id_chamado, id_tecnico, id_novo_tecnico, mensagem, tipo_interacao
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [id_chamado, id_tecnico, id_novo_tecnico || null, mensagem, tipo_interacao]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar interação' });
  }
};

// Listar interações por chamado
exports.listInteracoesByChamadoId = async (req, res) => {
  const { id } = req.params; 

  try {
    const result = await pool.query(`
      SELECT i.*, u.nome AS tecnico_nome
      FROM interacao i
      JOIN usuario u ON i.id_tecnico = u.id
      WHERE i.id_chamado = $1
      ORDER BY i.data_hora_mudanca DESC
    `, [id]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar interações do chamado' });
  }
};


// Buscar interação por ID
exports.findInteracaoById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT i.*, 
             u.nome AS tecnico_nome,
             c.titulo AS chamado_titulo
      FROM interacao i
      JOIN usuario u ON i.id_tecnico = u.id
      JOIN chamado c ON i.id_chamado = c.id
      WHERE i.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Interação não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar interação' });
  }
};

// Deletar uma interação
exports.deleteInteracaoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM interacao WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Interação não encontrada' });
    res.json({ mensagem: 'Interação removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar interação' });
  }
};

// Fazer update em interacao
exports.updateInteracaoById = async (req, res) => {
  const { id } = req.params;
  const { id_chamado, id_tecnico, id_novo_tecnico, mensagem, tipo_interacao } = req.body;

  try {
    const interacaoExiste = await existsInTable('interacao', id);
    if (!interacaoExiste) return res.status(404).json({ erro: 'Interação não encontrada' });

    const chamadoExiste = await existsInTable('chamado', id_chamado);
    const tecnicoExiste = await existsInTable('usuario', id_tecnico);
    const novoTecnicoValido = !id_novo_tecnico || await existsInTable('usuario', id_novo_tecnico);

    if (!chamadoExiste) return res.status(400).json({ erro: 'Chamado não encontrado' });
    if (!tecnicoExiste) return res.status(400).json({ erro: 'Técnico responsável não encontrado' });
    if (!novoTecnicoValido) return res.status(400).json({ erro: 'Novo técnico não encontrado' });

    const result = await pool.query(`
      UPDATE interacao
      SET id_chamado = $1,
          id_tecnico = $2,
          id_novo_tecnico = $3,
          mensagem = $4,
          tipo_interacao = $5
      WHERE id = $6
      RETURNING *
    `, [id_chamado, id_tecnico, id_novo_tecnico || null, mensagem, tipo_interacao, id]);

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar interação' });
  }
};
