const express = require('express');

const {
  listarCatalogo,
  buscarCatalogoPorId
} = require('../controllers/catalogoController');

const router = express.Router();

router.get('/', listarCatalogo);
router.get('/:id', buscarCatalogoPorId);

module.exports = router;