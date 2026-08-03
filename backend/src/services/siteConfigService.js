const axios = require('axios');

const BASE_URL = 'https://api-ip3d.mbinfoseg.com.br/api';


async function buscar(page = 1) {

  const response = await axios.get(
    `${BASE_URL}/site-config?page=${page}`
  );

  return response.data;
}


module.exports = {
  buscar
};