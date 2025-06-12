// Rotas de tipoStatus

const router = require('express-promise-router')();
const tipoStatusController = require('../controllers/tipoStatus.controller');

// Criar novo tipoStatus: (POST): localhost:3000/API/tipoStatus
router.post('/tipostatus', tipoStatusController.createTipoStatus);

// Listar todos os tipoStatus: (GET): localhost:3000/API/tipoStatus
router.get('/tipostatus', tipoStatusController.listAllTipoStatus);

// Listar tipoStatus por Id: (GET): localhost:3000/API/tipoStatus/:id
router.get('/tipostatus/:id', tipoStatusController.findTipoStatusById);

// Atualizar tipoStatus por Id: (PUT): localhost:3000/API/tipoStatus/:id
router.put('/tipostatus/:id', tipoStatusController.updateTipoStatusById);

// Deletar tipoStatus por Id: (DELETE): localhost:3000/API/tipoStatus/:id
router.delete('/tipostatus/:id', tipoStatusController.deleteTipoStatusById);

module.exports = router;
