// Rotas de interações

const router = require('express-promise-router')();
const interacaoController = require('../controllers/interacao.controller');

// Criar nova interação: (POST): localhost:3000/API/interacao
router.post('/interacao', interacaoController.createInteracao);

// Listar todas as interações: (GET): localhost:3000/API/interacao
router.get('/interacao', interacaoController.listAllInteracoes);

// Listar uma interação por Id: (GET): localhost:3000/API/interacao/:id
router.get('/interacao/:id', interacaoController.findInteracaoById);

// Atualizar uma interação por Id: (PUT): localhost:3000/API/interacao/:id
router.put('/interacao/:id', interacaoController.updateInteracaoById);

// Deletar uma interação por Id: (DELETE): localhost:3000/API/interacao/:id
router.delete('/interacao/:id', interacaoController.deleteInteracaoById);

module.exports = router;
