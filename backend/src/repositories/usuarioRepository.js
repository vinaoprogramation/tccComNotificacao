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

  return rows[0] || null;
}


async function buscarRequestsUser(userId) {

  const [rows] = await pool.execute(
    `
      SELECT * FROM requests WHERE userId = ?
    `, [userId]
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



module.exports = {
  buscarUsuarios,
  buscarPorUsuario,
  buscarPorId,
  registrar,
  registrarRequest,
  buscarRequestsAdmin,
  buscarRequestsUser
};