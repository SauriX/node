const express = require('express');
const app = express();
const Slide = require('../controladores/slide.controlador');
app.get('/mostrar-slide',Slide.mostrarSlide);
app.post('/crear-slide',Slide.crearSlide);
app.put('/editar-slide/:id',Slide.editarSlide);
app.delete('/borrar-slide/:id',Slide.borrarSlide);
module.exports = app;