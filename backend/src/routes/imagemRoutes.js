const express = require('express');

const {
  gerarThumbnail,
  obterMetadata
} = require('../controllers/imagemController');

const router = express.Router();

router.get('/thumbnail/:id', gerarThumbnail);
router.get('/metadata/:id', obterMetadata);

module.exports = router;