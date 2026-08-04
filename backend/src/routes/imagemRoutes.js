const express = require('express');

const {
  gerarThumbnail,
  obterMetadata
} = require('../controllers/imagemController');

const autenticar =  require('../middlewares/authMiddleware')


const router = express.Router();

router.get('/thumbnail/:id', autenticar, gerarThumbnail);
router.get('/metadata/:id', autenticar, obterMetadata);

module.exports = router;