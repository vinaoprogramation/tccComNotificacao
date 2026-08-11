const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: 
    ['http://localhost:3000',      // Seu front-end web (se houver)
    'http://10.0.2.2:8081',       // Emulador Android Studio (porta padrão do Metro Bundler/Expo)
    'http://10.0.3.2:8081']
}

const catalogoRoutes = require('./routes/catalogoRoutes');
const imagemRoutes = require('./routes/imagemRoutes');
const siteConfigRoutes = require('./routes/siteConfigRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/catalogo', catalogoRoutes);
app.use('/imagens', imagemRoutes);
app.use('/site-config', siteConfigRoutes);
app.use('/usuarios', usuarioRoutes);

module.exports = app;