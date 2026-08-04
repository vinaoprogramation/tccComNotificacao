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

function voltarToken(token) {
  try {

    const payloadDecodificado = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payloadDecodificado.userId
  } catch(error){
    return res.status(500).json({
      Erro: "Erro ao decodificar token" + error
    })
  }

  


}


function verificarToken(token) {

  return jwt.verify(
    token,
    process.env.JWT_SECRET
  );
}


module.exports = {
  voltarToken,
  gerarToken,
  verificarToken
};