const usuarioRepository = require('../repositories/usuarioRepository');
const { verificarToken } = require('../utils/jwt');


async function autenticarId(req, res, next) {

  try {
    const token = req.headers.authorization
    const tokenFormatado = token.split(" ");

    console.log("Token: "+tokenFormatado[1])
    const decoded = verificarToken(tokenFormatado[1])

    const userId = decoded.userId

    const verifyId = await usuarioRepository.buscarPorId(userId)


    if(verifyId.role !== 'admin'){
        return res.status(401).json({
            error: 'Acesso negado'
          });
    }

    next();

  } catch (error) {

    return res.status(401).json({
      error: 'Erroo na autenticação por id'
    });
  }
}

module.exports = autenticarId;