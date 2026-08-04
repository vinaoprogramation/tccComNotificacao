const express = require('express');

const autenticar =  require('../middlewares/authMiddleware')

const {
  buscarSiteConfig
} = require('../controllers/siteConfigController');

const router = express.Router();

router.get('/', autenticar, buscarSiteConfig);

module.exports = router;