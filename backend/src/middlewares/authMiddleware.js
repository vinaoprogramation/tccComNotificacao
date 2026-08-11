const { verificarToken } = require('../utils/jwt');

function autenticar(req, res, next) {

  try {

    const authorization =req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        error: 'Token não informado'
      });
    }

    const [tipo, token] =
      authorization.split(' ');

    if (tipo !== 'Bearer' || !token) {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }

    const payload = verificarToken(token);

    req.user = payload;

    next();

  } catch (error) {

    return res.status(401).json({
      error: 'Token inválido ou expirado'
    });
  }
}

module.exports = autenticar;