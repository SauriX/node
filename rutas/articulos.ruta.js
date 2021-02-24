const express = require('express');
const app = express();
const Articulo= require('../controladores/articulos.controlador');
app.get('/mostrar-articulos',Articulo.mostrarArticulo);

module.exports = app;