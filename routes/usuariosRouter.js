const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const validarCadastro = require('../middlewares/ValidarCadastro');

/* GET users listing. */
router.get('/',usuariosController.index);
// http://localhost:3000/usuarios/

router.get('/registro', usuariosController.registro);
// http://localhost:3000/usuarios/registro

router.get('/login', usuariosController.login);

router.post('/', validarCadastro, usuariosController.create);
// http://localhost:3000/usuarios/

router.put('/:id', usuariosController.update);
// http://localhost:3000/usuarios/0

router.delete('/:id', usuariosController.delete);
// http://localhost:3000/usuarios/0

module.exports = router;