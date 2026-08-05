const express = require('express');

const {
    login,
    registrar,
    registrarAdmin,
    registrarRequest,
    getRequestsAdmin,
    getRequestsUser,
} = require('../controllers/usuarioController');

const router = express.Router();

const autenticar =  require('../middlewares/authMiddleware')
const autenticarId = require('../middlewares/adminMiddleware')

router.post('/login', login);
router.post('/registrar', registrar);
router.post('/registrar/admin', autenticar, autenticarId, registrarAdmin);
router.post('/registrar/request', autenticar, registrarRequest);
router.post('/get/requests/admin', autenticar, autenticarId, getRequestsAdmin);
router.post('/get/requests/user', autenticar, getRequestsUser);

module.exports = router;