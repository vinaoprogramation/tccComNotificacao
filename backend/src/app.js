const express = require('express');
const cors = require('cors');

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