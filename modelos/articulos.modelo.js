const mongoose = require ('mongoose');
/* esquema mongo */
let Schema = mongoose.Schema;

let articuloSchema = new Schema({
    portada:{
        type:String,
        require: [true,'la imagen es obligatoria']
    },
    titulo:{
        type:String,
        require: [true,'la tituloes obligatoria']
    },
    intro:{
        type:String,
        require: [true,'la intro es obligatoria']
    },
    contenido:{
        type:String,
        require: [true,'la contenido es obligatoria']
    },
    url:{
        type:String,
        require: [true,'la url es obligatoria']
    }
});

module.exports = mongoose.model("articulos",articuloSchema);