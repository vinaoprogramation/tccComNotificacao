const usuarioService = require('../services/usuarioService');
const { verificarToken } = require('../utils/jwt');

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




async function registrarAdmin(req, res) {
  
  try {
    const { userId, username, password } = req.body;
  
    if (!userId || !username || !password) {
      return res.status(400).json({
        error: 'Usuário e senha e id são obrigatórios'
      });
    }

    const resultado = await usuarioService.registrarAdmin(userId, username, password);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Usuário não é admin ou usuário postado já existe'
    });
  }
}




async function registrarRequest(req, res) {
  
  try {
    const { userId, message} = req.body;

    if(!userId || !message){
      return res.status(400).json({
        error: 'Id e mensagem obrigatórios'
      });
    }

    const resultado = await usuarioService.registrarRequest(userId, message);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro ao postar mensagem'
    });
  }
}


async function registrarResposta(req, res) {
  
  try {
    const { requestId, responseMessage, decision } = req.body;
    
    const token = req.headers.authorization
    const tokenFormatado = token.split(" ");

    const decoded = verificarToken(tokenFormatado[1])

    const adminId = decoded.userId

    if(!requestId || !responseMessage || !adminId){
      return res.status(400).json({
        error: 'Itens obrigatórios'
      });
    }

    const request = await usuarioService.getRequestsById(requestId);

    if(request.request[0].userId == adminId){
      return res.status(400).json({
        error: 'Admin não pode responder a própria requisição'
      });
    }

    if(request.request[0].responseMessage){
      return res.status(400).json({
        error: 'Requisição já respondida'
      });
    }

    const resultado = await usuarioService.registrarResposta(requestId, responseMessage, adminId, decision);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro ao postar resposta'
    });
  }
}




async function getRequestsAdmin(req, res) {
  
  try {
    const token = req.headers.authorization
    const tokenFormatado = token.split(" ");

    const decoded = verificarToken(tokenFormatado[1])

    const userId = decoded.userId

    if(!userId){
      return res.status(400).json({
        error: 'Id obrigatório'
      });
    }

    const resultado = await usuarioService.getRequestsAdmin(userId);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro ao carregar mensagem'
    });
  }
}



async function getRequestsUser(req, res) {
  
  try {
    const { userId } = req.body;

    if(!userId){
      return res.status(400).json({
        error: 'Id obrigatório'
      });
    }

    const resultado = await usuarioService.getRequestsUser(userId);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro ao carregar mensagem'
    });
  }
}





module.exports = {
  login,
  registrar,
  registrarAdmin,
  registrarRequest,
  registrarResposta,
  getRequestsAdmin,
  getRequestsUser,
};
