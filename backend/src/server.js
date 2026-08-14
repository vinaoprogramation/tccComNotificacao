require('dotenv').config();
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:8081', 'http://10.0.2.2:8081',]
}

const app = require('./app');
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});