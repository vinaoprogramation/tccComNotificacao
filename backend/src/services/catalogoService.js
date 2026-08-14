const axios = require('axios');
const cache = require('../config/cache');
const { formatarData } = require('../utils/formatDate');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';
const BACKEND_URL = 'http://192.168.1.14:3000';

async function listarCatalogo(page = 1) {
 try {

    const api = await axios.get(
      `${BASE_URL}/catalogo?page=${page}`
    );


    const projetos = api.data.projetos;


    const detalhes = await Promise.all(
      projetos.map(p =>
        axios.get(`${BASE_URL}/catalogo/${p.id}`)
      )
    );




    const resultado = projetos.map((p, i) => {
      const fotos = detalhes[i].data.fotos || [];
      const perfis = detalhes[i].data.projeto || [];


      const isoString = detalhes[i].data.projeto.created_at;
      const data = new Date(isoString);


      const formatoBrasil = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo'
      });


      const dataFormatada = formatoBrasil.format(data);


      return {
        ...p,
        thumbnailUrl: fotos[0]
          ? `${BACKEND_URL}/imagens/thumbnail/${fotos[0].id}`
          : null,
        fotoPerfil: perfis.usuario_id
          ? `${BASE_URL}/catalogo/usuarios/${perfis.usuario_id}/avatar`
          : null,
        data: dataFormatada


      };
    });


    return {
      resultado
    };


  } catch (e) {
    return { 
      error: "erro catálogo" 
    };
  }
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


