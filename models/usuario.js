var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.methods.reservar = function(vehiId, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, vehiculo: vehiId, desde: desde, hasta: hasta, cb: cb});
    console.log(reserva);
    reserva.save(cb);
}

module.exports = mongoose.model('Usuario', usuarioSchema);