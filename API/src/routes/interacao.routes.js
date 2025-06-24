// Rotas de interações

const router = require('express-promise-router')();
const interacaoController = require('../controllers/interacao.controller');

// Criar nova interação: (POST): localhost:3000/API/interacao
router.post('/interacao', interacaoController.createInteracao);

// Listar todas as interações por um chamdo ID: (GET): localhost:3000/API//interacao/chamado:id
router.get('/interacao/chamado/:id', interacaoController.listInteracoesByChamadoId);

// Listar uma interação por Id: (GET): localhost:3000/API/interacao/:id
router.get('/interacao/:id', interacaoController.findInteracaoById);

// Rota responsável por atualizar uma determinada interação por Id: (PUT): localhost:3000/API/interacao/:id
router.put('/interacao/:id', chamadoController.updateInteracaoById)

// Deletar uma interação por Id: (DELETE): localhost:3000/API/interacao/:id
router.delete('/interacao/:id', interacaoController.deleteInteracaoById);

module.exports = router;
