const axios = require('axios');
const cache = require('../config/cache');
const { formatarData } = require('../utils/formatDate');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';
const BACKEND_URL = 'http://192.168.1.14:3001';

async function listarCatalogo(page = 1) {

  const api = await axios.get(
    `${BASE_URL}/catalogo?page=${page}`
  );

  const projetos = api.data.projetos || [];

  const detalhes = await Promise.all(
    projetos.map(projeto =>
      axios.get(`${BASE_URL}/catalogo/${projeto.id}`)
    )
  );

  const resultado = projetos.map((projeto, index) => {

    const detalhe = detalhes[index].data;

    const fotos = detalhe.fotos || [];
    const perfil = detalhe.projeto || {};

    return {
      ...projeto,

      thumbnailUrl: fotos[0]
        ? `${BASE_URL}/catalogo/fotos/${fotos[0].id}/visualizar`
        : null,

      fotoPerfil: perfil.usuario_id
        ? `${BASE_URL}/catalogo/usuarios/${perfil.usuario_id}/avatar`
        : null,

      data: formatarData(perfil.created_at)
    };
  });

  return {
    projetos: resultado
  };
}


async function buscarPorId(id) {

  const cacheKey = `item_${id}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const api = await axios.get(
    `${BASE_URL}/catalogo/${id}`
  );

  const data = api.data;

  const usuarioId = data.projeto?.usuario_id;

  const avatar = usuarioId
    ? `${BASE_URL}/catalogo/usuarios/${usuarioId}/avatar`
    : null;

  const fotos = (data.fotos || []).map(foto => ({
    ...foto,

    url: `${BACKEND_URL}/thumbnail/${foto.id}`
  }));

  const stl = data.projeto?.stl_id;

  const downloadStl = stl
    ? `${BASE_URL}/catalogo/stl/${stl}/download`
    : null;

  const response = {
    projeto: data.projeto,
    fotos,
    downloadStl,
    avatar,
    data: formatarData(data.projeto?.created_at)
  };

  cache.set(cacheKey, response);

  return response;
}


module.exports = {
  listarCatalogo,
  buscarPorId
};