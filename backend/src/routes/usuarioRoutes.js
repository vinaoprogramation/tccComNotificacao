const express = require('express');

const {
    login,
    registrar,
    registrarFoto,
    registrarAdmin,
    registrarRequest,
    registrarResposta,
    getRequestsAdmin,
    getRequestsUser,
} = require('../controllers/usuarioController');

const router = express.Router();

const autenticar =  require('../middlewares/authMiddleware')
const autenticarId = require('../middlewares/adminMiddleware')

router.post('/login', login);
router.post('/registrar', registrar);
router.post('/registrar/foto', registrarFoto);
router.post('/registrar/admin', autenticar, autenticarId, registrarAdmin);
router.post('/registrar/request', autenticar, registrarRequest);
router.post('/registrar/request/resposta', autenticar, autenticarId, registrarResposta);
router.get('/get/requests/admin', autenticar, autenticarId, getRequestsAdmin);
router.get('/get/requests/user', autenticar, getRequestsUser);



module.exports = router;