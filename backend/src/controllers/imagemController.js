const imagemService = require('../services/imagemService');


async function gerarThumbnail(req, res) {

  try {

    const { id } = req.params;

    const imagem = await imagemService.gerarThumbnail(id);

    res.set('Content-Type', 'image/jpeg');

    return res.send(imagem);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Erro ao processar imagem'
    });
  }
}


async function obterMetadata(req, res) {

  try {

    const { id } = req.params;

    const metadata = await imagemService.obterMetadata(id);

    return res.json(metadata);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Erro ao obter metadata'
    });
  }
}


module.exports = {
  gerarThumbnail,
  obterMetadata
};