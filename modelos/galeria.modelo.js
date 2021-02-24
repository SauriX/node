const mongoose = require ('mongoose');
/* esquema mongo */
let Schema = mongoose.Schema;
let galeriaSchema = new Schema({
    foto:{
        type:String,
        require: [true,'la imagen es obligatoria']
    },

});

module.exports = mongoose.model("galerias",galeriaSchema);