const siteConfigService = require('../services/siteConfigService');


async function buscarSiteConfig(req, res) {

  try {

    const page = req.query.page || 1;

    const dados = await siteConfigService.buscar(page);

    return res.json({
      dados
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Erro ao buscar site-config'
    });
  }
}


module.exports = {
  buscarSiteConfig
};