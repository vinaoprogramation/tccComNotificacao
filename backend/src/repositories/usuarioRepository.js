const pool = require('../config/database');

async function buscarUsuarios() {
  const verifyAdminQuery = "SELECT COUNT(*) AS count FROM users";

  const verifyAdmin = await pool.query(verifyAdminQuery);

  return verifyAdmin[0][0].count;

}


async function buscarPorUsuario(username) {

  const [rows] = await pool.execute(
    `
      SELECT userId, username, password, role, photoUrl
      FROM users
      WHERE username = ?
      LIMIT 1
    `,
    [username]
  );

  console.log(rows)
  

  return rows[0] || null;

  
}


async function buscarPorId(userId) {

  const [rows] = await pool.execute(
    `
      SELECT userId, username, password, role, photoUrl
      FROM users
      WHERE userId = ?
      LIMIT 1
    `,
    [userId]
  );

  console.log(rows)

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

async function buscarNotificacoesAdmin() {

  const [rows] = await pool.execute(
    `
      SELECT * FROM notifications
    `
  );

  return rows || null;
}


async function buscarNotificacoesUser(userId) {

  const [rows] = await pool.execute(
    `
      SELECT * FROM notifications WHERE userId = ?
    `, [userId]
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

  return rows[0] || null;
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



async function registrarFoto(photoUrl, userId) {

  const [result] = await pool.execute(
    `
      UPDATE users SET photoUrl = ? WHERE userId = ?
    `,
    [photoUrl, userId]
  );

  return {
    photoUrl,
    userId
  };
}



async function registrarRequest(userId, username, material, filamentColor, weight) {

  const [result] = await pool.execute(
    "INSERT INTO requests (userId, username, status, createdAt, material, filamentColor, weight) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, username, "pending", new Date(), material, filamentColor, weight]
  );

  return {
    id: result.insertId,
    username,
    material, 
    filamentColor, 
    weight
  };
}

async function registrarResposta(requestId, responseMessage, adminId, decision) {

  const adminName = await pool.execute(
    "SELECT username FROM users WHERE userId = ?",
    [adminId]
  )

  const nameFiltered = adminName[0][0].username;

  if (adminName) {
    const [result] = await pool.execute(
      "UPDATE requests SET responseMessage = ?, adminId = ?, adminName = ?, updatedAt = ?, status = ? WHERE requestId = ?",
      [responseMessage, adminId, nameFiltered, new Date(), decision, requestId]
    );
  }



  return {
    requestId,
    nameFiltered,
    responseMessage,
  };
}

async function registrarNotificacaoRequest(userId, requestId) {

  const [result] = await pool.execute(
    "INSERT INTO notifications (userId, requestId, type, createdAt, isRead) VALUES (?, ?, ?, ?, ?)",
    [userId, requestId, 'request', new Date(), false]
  );

  return {
    result
  };
}


async function registrarNotificacaoResposta(adminId, requestId, responseMessage) {
  const informacoes = await buscarRequestPorId(requestId);
  const userId = informacoes?.userId;
  const message = informacoes?.message;

  if (userId, message) {
    const [result] = await pool.execute(
      "INSERT INTO notifications (userId, adminId, requestId, type, message, responseMessage, createdAt, isRead) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [userId, adminId, requestId, 'response', message, responseMessage, new Date(), true]
    );

    return {
      userId, 
      adminId,
      requestId,
      message,
      responseMessage,
    };

  }




}


module.exports = {
  buscarUsuarios,
  buscarPorUsuario,
  buscarPorId,
  registrar,
  registrarFoto,
  registrarRequest,
  registrarResposta,
  registrarNotificacaoRequest,
  registrarNotificacaoResposta,
  buscarRequestsAdmin,
  buscarRequestsUser,
  buscarNotificacoesAdmin,
  buscarNotificacoesUser,
  buscarRequestPorId,
};


