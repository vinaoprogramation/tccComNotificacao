const usuarioRepository = require('../repositories/usuarioRepository');
const {
  hashPassword,
  comparePassword
} = require('../utils/password');
const { gerarToken } = require('../utils/jwt');



async function login(username, password) {

  const usuarioEncontrado =
    await usuarioRepository.buscarPorUsuario(username);

  if (!usuarioEncontrado) {
    throw new Error('Usuário ou senha inválidos');
  }

  const senhaValida = await comparePassword(
    password,
    usuarioEncontrado.password
  );

  if (!senhaValida) {
    throw new Error('Usuário ou senha inválidos');
  }

  const token = gerarToken({
    userId: usuarioEncontrado.userId,
    username: usuarioEncontrado.username,
    userrole: usuarioEncontrado.role
  });

  return {
    token,
    username: usuarioEncontrado.username,
    role: usuarioEncontrado.role,
    foto: usuarioEncontrado.photoUrl
  };
}


async function registrar(username, password) {


  const existente = await usuarioRepository.buscarPorUsuario(username);

  if (existente) {
    throw new Error('Usuário já existe');
  }

  const senhaHash = await hashPassword(password);

  const verifyAdmin = await usuarioRepository.buscarUsuarios();

  let role = null
  if (verifyAdmin === 0) {
    role = "admin";
  } else {
    role = "user";
  }


  const registro = await usuarioRepository.registrar(
    username,
    senhaHash,
    role
  );

  if (registro) {
    return login(username, password);
  }
}


async function registrarFoto(photoUrl, userId) {



  const existente = await usuarioRepository.buscarPorUsuario(userId);

  if (existente) {
    throw new Error('Usuário não existe');
  }

  const registro = await usuarioRepository.registrarFoto(photoUrl, userId);

  if(registro){
    return {
      photoUrl, userId
  }
}
}



async function registrarAdmin(userId, username, password) {

  const verifyId = await usuarioRepository.buscarPorId(userId)
  if (verifyId.role != "admin") {
    throw new Error('Usuário não é administrador');
  }

  const existente = await usuarioRepository.buscarPorUsuario(username);

  if (existente) {
    throw new Error('Usuário já existe');
  }

  const senhaHash = await hashPassword(password);

  const role = "admin";

  const registro = await usuarioRepository.registrar(
    username,
    senhaHash,
    role
  );

  return {
    username,
    role
  };
}



async function registrarRequest(userId, material, filamentColor, weight) {

  const usuario = await usuarioRepository.buscarPorId(userId);

  if (!usuario) {
    throw new Error('Usuário não existe');
  }

  if(!material || !filamentColor || !weight){
    throw new Error('Material, Cor do filamento e peso necessáios');
  }


  const registro = await usuarioRepository.registrarRequest(
    userId, usuario.username, material, filamentColor, weight
  );

  const notificacao = await usuarioRepository.registrarNotificacaoRequest(userId, registro.id);

  return {
    registro
  };
}



async function registrarResposta(requestId, responseMessage, adminId, decision) {
  console.log("No service: "+ requestId, responseMessage, adminId, decision)

  const usuario = await usuarioRepository.buscarPorId(adminId);

  if (!usuario) {
    throw new Error('Usuário não existe');
  }

  if (usuario.role != "admin") {
    throw new Error('Usuário não é administrador');
  }

  const resposta = await usuarioRepository.registrarResposta(
    requestId, responseMessage, adminId, decision);

  const notificacao = await usuarioRepository.registrarNotificacaoResposta(requestId, responseMessage)

  return {
    resposta
  };
}





async function getRequestsAdmin(userId) {

  const usuario = await usuarioRepository.buscarPorId(userId);

  if (!usuario) {
    throw new Error('Usuário não existe');
  }

  if(usuario.role !=='admin'){
    throw new Error('Usuário não é administrador')
  }


  const requests = await usuarioRepository.buscarRequestsAdmin();

  return {
    requests
  };
}

async function getRequestsAdmin(userId) {

  const usuario = await usuarioRepository.buscarPorId(userId);

  if (!usuario) {
    throw new Error('Usuário não existe');
  }

  if(usuario.role !=='admin'){
    throw new Error('Usuário não é administrador')
  }


  const requests = await usuarioRepository.buscarRequestsAdmin();
  const notifications = await usuarioRepository.buscarNotificacoesAdmin();

  return {
    requests,
    notifications
  };
}


async function getRequestsUser(userId) {

  const usuario = await usuarioRepository.buscarPorId(userId);

  if (!usuario) {
    throw new Error('Usuário não existe');
  }

  const requests = await usuarioRepository.buscarRequestsUser(userId);
  const notifications = await usuarioRepository.buscarNotificacoesUser(userId);  
  return {
    requests,
    notifications
  };
}

async function getRequestsById(requestId) {

  const request = await usuarioRepository.buscarRequestPorId(requestId);

  if(!request){
    throw new Error('Requisição não existe');
  }
  return {
    request
  };
}





module.exports = {
  login,
  registrar,
  registrarFoto,
  registrarAdmin,
  registrarRequest,
  registrarResposta,
  getRequestsAdmin,
  getRequestsUser,
  getRequestsById,
};