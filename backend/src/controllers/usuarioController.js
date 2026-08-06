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


async function getRequestsAdmin(req, res) {
  
  try {
    const { userId } = req.body;

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




async function registrarDecisao(req, res) {
  
  try {
    const { userId, type, decision, message } = req.body;

    const { requestId } = req.params.id

    if(!userId || !decision ){
      return res.status(400).json({
        error: 'Id e decisão obrigatória'
      });
    }

    const resultado = await usuarioService.registrarDecisao(userId, type, decision, message, requestId);

    return res.json(resultado);

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: 'Erro ao registrar resposta'
    });
  }
}



module.exports = {
  login,
  registrar,
  registrarAdmin,
  registrarRequest,
  getRequestsAdmin,
  getRequestsUser,
  registrarDecisao
};
