const mongoose = require ('mongoose');
/* esquema mongo */
let Schema = mongoose.Schema;
let slideSchema = new Schema({
    imagen:{
        type:String,
        require: [true,'la imagen es obligatoria']
    },
    titulo:{
        type:String,
        required: false
    },
    descripcion:{
        type:String,
        required: false
    }
});

module.exports = mongoose.model("slides",slideSchema);