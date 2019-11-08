const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let vehiculosSchema = new Schema({
    placa:{
        type: String,
        require : [true, 'La placa del vehiculo es obligatoria..'],
        //defaul : "Sin nombre"

    },
//son
    marca:{
        type: String,
        require : [true, 'La marca del vehiculo es obligatoria..'],
       // defaul : "Por favor la Marca"

    }, 
    modelo:{
        type: String,
        require : [true, 'El modelo del vehiculo es obligatoria..'],
        defaul : "Sin modelo"

    },
    precio:{
        type: Number,
        require : [true, 'El precio  del vehiculo es obligatoria..'],
        defaul : "Sin precio"

    },
    codigo:{
        type: String,
        require : [true, 'El codigo  del vehiculo es obligatoria..'],

    },
});

module.exports = mongoose.model("Vehiculos", vehiculosSchema);