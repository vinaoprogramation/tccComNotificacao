const pool = require('../config/database');

async function buscarUsuarios() {
  const verifyAdminQuery = "SELECT COUNT(*) AS count FROM users";

  const verifyAdmin = await pool.query(verifyAdminQuery);

  return verifyAdmin[0][0].count; 

}


async function buscarPorUsuario(username) {

  const [rows] = await pool.execute(
    `
      SELECT userId, username, password, role
      FROM users
      WHERE username = ?
      LIMIT 1
    `,
    [username]
  );

  return rows[0] || null;
}


async function buscarPorId(userId) {

  const [rows] = await pool.execute(
    `
      SELECT userId, username, password, role
      FROM users
      WHERE userId = ?
      LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
}

async function buscarRequestsAdmin() {

  const [rows] = await pool.execute(
    `
      SELECT * FROM requests
    `
  );

  return rows || null;
}


async function buscarRequestsUser(userId) {

  const [rows] = await pool.execute(
    `
      SELECT * FROM requests WHERE userId = ?
    `, [userId]
  );

  return rows || null;
}


async function buscarRequestPorId(requestId) {

  const [rows] = await pool.execute(
    `
      SELECT * FROM requests WHERE requestId = ?
    `, [requestId]
  );

  return rows || null;
}



async function registrar(username, senhaHash, role, createdAt = new Date()) {

  const [result] = await pool.execute(
    `
      INSERT INTO users (username, password, role, createdAt)
      VALUES (?, ?, ?, ?)
    `,
    [username, senhaHash, role, createdAt]
  );

  return {
    id: result.insertId,
    username,
    role,
    createdAt
  };
}




async function registrarRequest(userId, username, message) {

  const [result] = await pool.execute(
    "INSERT INTO requests (userId, username, message, status, createdAt) VALUES (?, ?, ?, ?, ?)",
    [userId, username, message, "pending", new Date()]
  );

  return {
    id: result.insertId,
    username,
    message
  };
}

async function registrarResposta(requestId, responseMessage, adminId, adminName, decision) {
  console.log(requestId, responseMessage, adminId, adminName, decision)


  const [result] = await pool.execute(
    "UPDATE requests SET responseMessage = ?, adminId = ?, adminName = ?, updatedAt = ?, status = ? WHERE requestId = ?",
    [responseMessage, adminId, adminName, new Date(), decision, requestId]
  );

  return {
    requestId,
    adminName,
    responseMessage,
  };
}

async function registrarNotificacaoRequest(userId, requestId, message) {

  const [result] = await pool.execute(
    "INSERT INTO notifications (userId, requestId, type, message, createdAt, isRead) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, requestId, 'request', message, new Date(), false]
  );
 
  return {
    result
  };
}


async function registrarNotificacaoResposta(adminId, requestId, responseMessage) {
  const informacoes = await buscarRequestPorId(requestId);
  const userId = informacoes[0].userId;
  const message = informacoes[0].message;

  const [result] = await pool.execute(
    "INSERT INTO notifications (userId, adminId, requestId, type, message, responseMessage, createdAt, isRead) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [userId, adminId, requestId, 'response', message, responseMessage, new Date(), true]
  );
 
  return {
    result
  };
}


module.exports = {
  buscarUsuarios,
  buscarPorUsuario,
  buscarPorId,
  registrar,
  registrarRequest,
  registrarResposta,
  registrarNotificacaoRequest,
  registrarNotificacaoResposta,
  buscarRequestsAdmin,
  buscarRequestsUser,
  buscarRequestPorId,
};
