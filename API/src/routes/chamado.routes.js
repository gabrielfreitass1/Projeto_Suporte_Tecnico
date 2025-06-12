// Rotas dos chamados

const router = require('express-promise-router')();
const chamadoController = require('../controllers/chamado.controller');

// Rota responsável por criar um novo chamado: (POST): localhost:3000/API/chamado
router.post('/chamado', chamadoController.createChamado);

// Rota responsável por listar todos os chamados: (GET): localhost:3000/API/chamado
router.get('/chamado', chamadoController.listAllChamados);

// Rota responsável por listar um chamado por Id: (GET): localhost:3000/API/chamado/:id
router.get('/chamado/:id', chamadoController.findChamadoById)

// Rota responsável por atualizar um determinado chamado por Id: (PUT): localhost:3000/API/chamado/:id
router.put('/chamado/:id', chamadoController.updateChamadoById)

// Rota responsável por deletar chamado por Id: (DELETE): localhost:3000/API/chamado/:id
router.delete('/chamado/:id', chamadoController.deleteChamadoById);

module.exports = router;
