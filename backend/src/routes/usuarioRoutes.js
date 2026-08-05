const express = require('express');

const {
    login,
    registrar,
    registrarAdmin,
    registrarRequest,
    getRequestsAdmin,
    getRequestsUser,
    registrarDecisao,
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
router.post('/get/requests/user', autenticar, getRequestsUser);
router.post('/registrar/requests/:id/decisao', autenticar, autenticarId, registrarDecisao);


module.exports = router;