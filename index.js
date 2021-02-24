require('./config');
const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
/* midleware */
/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
/* midlewara para subir archivos */
app.use(fileUpload());
/* json */
app.use(bodyParser.json());
/* rutas */
app.use(require('./rutas/slide.ruta'));
app.use(require('./rutas/galeria.ruta'));
app.use(require('./rutas/articulos.ruta'));

/* conexion */
mongoose.connect('mongodb+srv://sauri:sauri@cluster0.i1ypn.mongodb.net/apirest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},(err,res)=>{
    if(err) throw err;
    console.log("conectado");
});

/* puerto */
app.listen(process.env.PORT, () => {
    console.log("puerto listos");

});