const express = require('express');
const router = express.Router();
//para ter um codigo mais limpo implementamos os metodos em outro arquivo e importamos ele
const controllerUsuarios = require("../controller/controllerUsuarios");

router.post('/cadastro',controllerUsuarios.postCadastroUsuario);
router.post('/login',controllerUsuarios.postLoginUsuario);

module.exports = router;