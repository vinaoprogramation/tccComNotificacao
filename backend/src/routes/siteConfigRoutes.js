const express = require('express');

const {
  buscarSiteConfig
} = require('../controllers/siteConfigController');

const router = express.Router();

router.get('/', buscarSiteConfig);

module.exports = router;