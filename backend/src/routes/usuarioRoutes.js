const express = require('express');

const {
    login,
    registrar,
    registrarAdmin,
} = require('../controllers/usuarioController');

const router = express.Router();

router.post('/login', login);
router.post('/registrar', registrar);
router.post('/registrar/admin', registrarAdmin);

module.exports = router;