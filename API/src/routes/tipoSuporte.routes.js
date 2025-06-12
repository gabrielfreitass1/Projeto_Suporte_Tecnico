// Rotas de tipoSuporte

const router = require('express-promise-router')();
const tipoSuporteController = require('../controllers/tipoSuporte.controller');

// Criar novo tipoSuporte: (POST): localhost:3000/API/tipoSuporte
router.post('/tipoSuporte', tipoSuporteController.createTipoSuporte);

// Listar todos os tipoSuporte: (GET): localhost:3000/API/tipoSuporte
router.get('/tipoSuporte', tipoSuporteController.listAllTipoSuporte);

// Listar tipoSuporte por Id: (GET): localhost:3000/API/tipoSuporte/:id
router.get('/tipoSuporte/:id', tipoSuporteController.findTipoSuporteById);

// Atualizar tipoSuporte por Id: (PUT): localhost:3000/API/tipoSuporte/:id
router.put('/tipoSuporte/:id', tipoSuporteController.updateTipoSuporteById);

// Deletar tipoSuporte por Id: (DELETE): localhost:3000/API/tipoSuporte/:id
router.delete('/tipoSuporte/:id', tipoSuporteController.deleteTipoSuporteById);

module.exports = router;
