const catalogoService = require('../services/catalogoService');

async function listarCatalogo(req, res) {
  try {
    const page = req.query.page || 1;

    const resultado = await catalogoService.listarCatalogo(page);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao buscar catálogo'
    });
  }
}


async function buscarCatalogoPorId(req, res) {
  try {
    const { id } = req.params;

    const resultado = await catalogoService.buscarPorId(id);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao buscar detalhe do catálogo'
    });
  }
}


module.exports = {
  listarCatalogo,
  buscarCatalogoPorId
};