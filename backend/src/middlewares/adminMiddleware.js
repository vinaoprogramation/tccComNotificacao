const usuarioRepository = require('../repositories/usuarioRepository');


async function autenticarId(req, res, next) {

  try {
    const userId = req.body.userId;
    console.log(userId)

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