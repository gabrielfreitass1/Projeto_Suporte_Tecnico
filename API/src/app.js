// arquivo responsavel por fazer conexao com o arquivo server.js

const express = require('express');
const cors = require('cors');
const app = express();

const index = require('./routes/index');
const usuarioRoute = require('./routes/usuario.routes');
const tipoStatusRoute = require('./routes/tipoStatus.routes');
const tipoSuporteRoute = require('./routes/tipoSuporte.routes');
const chamadoRoute = require('./routes/chamado.routes');
const interacaoRoute = require('./routes/interacao.routes');

app.use(express.urlencoded( { extended: true } ) );
app.use(express.json() );
app.use(express.json( { type: 'application/vnd.api+json'}) );
app.use(cors() );

app.use(index);
app.use('/API', usuarioRoute);
app.use('/API', tipoStatusRoute);
app.use('/API', tipoSuporteRoute);
app.use('/API', chamadoRoute);
app.use('/API', interacaoRoute);

module.exports = app;