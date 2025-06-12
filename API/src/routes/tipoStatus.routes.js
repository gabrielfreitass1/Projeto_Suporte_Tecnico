// Rotas de tipoStatus

const router = require('express-promise-router')();
const tipoStatusController = require('../controllers/tipoStatus.controller');

// Criar novo tipoStatus: (POST): localhost:3000/API/tipoStatus
router.post('/tipoStatus', tipoStatusController.createTipoStatus);

// Listar todos os tipoStatus: (GET): localhost:3000/API/tipoStatus
router.get('/tipoStatus', tipoStatusController.listAllTipoStatus);

// Listar tipoStatus por Id: (GET): localhost:3000/API/tipoStatus/:id
router.get('/tipoStatus/:id', tipoStatusController.findTipoStatusById);

// Atualizar tipoStatus por Id: (PUT): localhost:3000/API/tipoStatus/:id
router.put('/tipoStatus/:id', tipoStatusController.updateTipoStatusById);

// Deletar tipoStatus por Id: (DELETE): localhost:3000/API/tipoStatus/:id
router.delete('/tipoStatus/:id', tipoStatusController.deleteTipoStatusById);

module.exports = router;
