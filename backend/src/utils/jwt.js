const jwt = require('jsonwebtoken');

function gerarToken(payload) {

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );
}


function verificarToken(token) {

  return jwt.verify(
    token,
    process.env.JWT_SECRET
  );
}


module.exports = {
  gerarToken,
  verificarToken
};