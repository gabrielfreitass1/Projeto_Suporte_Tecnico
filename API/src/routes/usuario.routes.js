// Rotas dos usuarios

const router = require('express-promise-router')();
const usuarioController = require('../controllers/usuario.controller');

// Rota responsável por criar um novo usuario: (POST): localhost:3000/API/usuario
router.post('/usuario', usuarioController.createUsuario);

// Rota responsável por listar todos os usuarios: (GET): localhost:3000/API/usuario
router.get('/usuario', usuarioController.listAllUsuarios);

// Rota responsável por listar um usuario por Id: (GET): localhost:3000/API/usuario/:id
router.get('/usuario/:id', usuarioController.findUsuarioById)

// Rota reponsável por atualizar um determinado usuario por Id: (PUT): localhost:3000/API/usuario/:id
router.put('/usuario/:id', usuarioController.updateUsuarioById)

// Rota responsável por deletar usuario por Id: (DELETE) localhost:3000/API/usuario/:id
router.delete('/usuario/:id', usuarioController.deleteUsuarioById);

module.exports = router;