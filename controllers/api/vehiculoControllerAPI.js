var Vehiculo = require('../../models/vehiculo');

exports.vehiculo_list = function(req, res){
    Vehiculo.allVehis(function(err, vehiculos){
        res.status(200).json({
            vehiculos: vehiculos
        });    
    });
};

exports.vehiculo_create = function(req, res){
    var vehi =  new Vehiculo({code: req.body.id, nombre: req.body.nombre, apellido: req.body.apellido, placa: req.body.placa, color: req.body.color, modelo: req.body.modelo, año: req.body.año});
    
    Vehiculo.add(vehi);

    res.status(200).json({
        vehiculo: vehi
    });    
};

exports.vehiculo_delete = function(req, res){
    Vehiculo.removeByCode(req.body.id, function(){
        res.status(204).send();
    });    
};

exports.vehiculo_update = function(req, res){
    var nuevoVehi = {
        code: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        placa: req.body.placa,
        modelo: req.body.modelo,
        color: req.body.color,
        año: req.body.año
    };
    var vehi = Vehiculo.findOneAndUpdate({code: req.body.id}, nuevoVehi, function() {
        res.status(200).json({
            vehiculo: nuevoVehi
        });
    });
    
}