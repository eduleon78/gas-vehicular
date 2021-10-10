var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehiculoSchema = new Schema({
    code: Number,
    nombre: String,
    apellido: String,
    placa: String,
    color: String,
    modelo: String,
    año: Number
});

vehiculoSchema.statics.createInstance = function(code, nombre, apellido, placa, color, modelo, año){
    return new this({
        code: code,
        nombre: nombre,
        apellido: apellido,
        placa: placa,
        color: color,
        modelo: modelo,
        año: año
    });
};

vehiculoSchema.methods.toString = function() {
    return 'code: ' + this.code + ' | nombre: ' + this.nombre;
};

vehiculoSchema.statics.allVehis = function(cb){
    return this.find({}, cb);
};

vehiculoSchema.statics.add = function(aVehi, cb){
   this.create(aVehi, cb);
};

vehiculoSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({code: aCode}, cb);
};

vehiculoSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({code: aCode}, cb);
};

module.exports = mongoose.model('Vehiculo', vehiculoSchema);