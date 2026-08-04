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
    role: usuarioEncontrado.role
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

  if(registro) {
    return login(username, password);
  }
}




async function registrarAdmin(userId, username, password) {

  const verifyId = await usuarioRepository.buscarPorId(userId)
  if (verifyId.role != "admin"){
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

  return{
    username,
    role
  };
}




module.exports = {
  login,
  registrar,
  registrarAdmin
};