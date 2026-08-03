const axios = require('axios');
const sharp = require('sharp');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';
const BACKEND_URL = 'http://192.168.1.14:3001';

async function baixarImagem(id) {

  const response = await axios.get(
    `${BASE_URL}/catalogo/fotos/${id}/visualizar`,
    {
      responseType: 'arraybuffer'
    }
  );

  return response.data;
}


async function gerarThumbnail(id) {

  const imagem = await baixarImagem(id);

  const buffer = await sharp(imagem)
    .rotate()
    .resize({
      width: 1000,
      withoutEnlargement: true,
      fit: 'inside'
    })
    .jpeg({
      quality: 95,
      mozjpeg: true,
      chromaSubsampling: '4:4:4'
    })
    .toBuffer();

  return buffer;
}


async function obterMetadata(id) {

  const imagem = await baixarImagem(id);

  return await sharp(imagem).metadata();
}


module.exports = {
  gerarThumbnail,
  obterMetadata
};