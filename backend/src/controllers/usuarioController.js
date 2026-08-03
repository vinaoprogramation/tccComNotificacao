const usuarioService = require('../services/usuarioService');

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Usuário e senha são obrigatórios'
      });
    }

    const resultado = await usuarioService.login(username, password);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Usuário ou senha inválidos'
    });
  }
};



async function registrar(req, res) {
  
  try {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({
        error: 'Usuário e senha são obrigatórios'
      });
    }

    const resultado = await usuarioService.registrar(username, password);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Usuário já existe'
    });
  }
}
module.exports = {
  login,
  registrar
};
