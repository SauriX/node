const express = require('express');
const app = express();
const Galeria = require('../controladores/galeria.controlador');
app.get('/mostrar-galeria',Galeria.mostrarGaleria);

module.exports = app;