const express = require('express');

const {
  listarCatalogo,
  buscarCatalogoPorId
} = require('../controllers/catalogoController');

const autenticar =  require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/', autenticar, listarCatalogo);
router.get('/:id', autenticar, buscarCatalogoPorId);

module.exports = router;