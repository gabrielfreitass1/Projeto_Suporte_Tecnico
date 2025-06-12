const pool = require('../config/database');
const { existsInTable } = require('../utils/dbUtils');

// Criar chamado
exports.createChamado = async (req, res) => {
  const {
    titulo,
    descricao,
    nivel_problema,
    criado_por_id,
    tecnico_atual_id,
    id_status,
    id_suporte
  } = req.body;

  try {
    // Verificar se FKs existem com funçao auxiliar acima ^^^^^
    const usuarioExiste = await existsInTable('usuario', criado_por_id);
    const statusExiste = await existsInTable('tipo_status', id_status);
    const suporteExiste = await existsInTable('tipo_suporte', id_suporte);

    if (!usuarioExiste) return res.status(400).json({ erro: 'Usuário criador não encontrado' });
    if (!statusExiste) return res.status(400).json({ erro: 'Tipo de status inválido' });
    if (!suporteExiste) return res.status(400).json({ erro: 'Tipo de suporte inválido' });

    // técnico_atual_id é opcional, só valida se estiver presente
    if (tecnico_atual_id) {
      const tecnicoExiste = await existsInTable('usuario', tecnico_atual_id);
      if (!tecnicoExiste) return res.status(400).json({ erro: 'Técnico atual não encontrado' });
    }

    const result = await pool.query(`
      INSERT INTO chamado (
        titulo, descricao, nivel_problema,
        criado_por_id, tecnico_atual_id, id_status, id_suporte
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        titulo,
        descricao,
        nivel_problema,
        criado_por_id,
        tecnico_atual_id || null,
        id_status,
        id_suporte
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar chamado' });
  }
};

// Listar todos os chamados
exports.listAllChamados = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, 
             u1.nome AS criador_nome,
             u2.nome AS tecnico_nome,
             ts.descricao AS status,
             tp.descricao AS tipo_suporte
      FROM chamado c
      JOIN usuario u1 ON c.criado_por_id = u1.id
      JOIN usuario u2 ON c.tecnico_atual_id = u2.id
      JOIN tipo_status ts ON c.id_status = ts.id
      JOIN tipo_suporte tp ON c.id_suporte = tp.id
      ORDER BY c.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar chamados' });
  }
};

// Buscar chamado por ID
exports.findChamadoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT c.*, 
             u1.nome AS criador_nome,
             u2.nome AS tecnico_nome,
             ts.descricao AS status,
             tp.descricao AS tipo_suporte
      FROM chamado c
      JOIN usuario u1 ON c.criado_por_id = u1.id
      JOIN usuario u2 ON c.tecnico_atual_id = u2.id
      JOIN tipo_status ts ON c.id_status = ts.id
      JOIN tipo_suporte tp ON c.id_suporte = tp.id
      WHERE c.id = $1
    `, [id]);

    if (result.rows.length === 0) return res.status(404).json({ erro: 'Chamado não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar chamado' });
  }
};

// Atualizar chamado
exports.updateChamadoById = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descricao,
    nivel_problema,
    tecnico_atual_id,
    id_status,
    id_suporte,
    data_hora_fechamento
  } = req.body;

  try {
    const tecnicoExiste = await existsInTable('usuario', tecnico_atual_id);
    const statusExiste = await existsInTable('tipo_status', id_status);
    const suporteExiste = await existsInTable('tipo_suporte', id_suporte);

    if (!tecnicoExiste) return res.status(404).json({ erro: 'Técnico atual inválido' });
    if (!statusExiste) return res.status(404).json({ erro: 'Tipo de status inválido' });
    if (!suporteExiste) return res.status(404).json({ erro: 'Tipo de suporte inválido' });

    const result = await pool.query(`
      UPDATE chamado SET
        titulo = $1,
        descricao = $2,
        nivel_problema = $3,
        tecnico_atual_id = $4,
        id_status = $5,
        id_suporte = $6,
        data_hora_atualizacao = CURRENT_TIMESTAMP,
        data_hora_fechamento = $7
      WHERE id = $8
      RETURNING *`,
      [titulo, descricao, nivel_problema, tecnico_atual_id, id_status, id_suporte, data_hora_fechamento, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ erro: 'Chamado não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar chamado' });
  }
};

// Deletar chamado
exports.deleteChamadoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM chamado WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Chamado não encontrado' });
    res.json({ mensagem: 'Chamado removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar chamado' });
  }
};
