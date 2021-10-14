var Vehiculo = require('../../models/vehiculo');

exports.vehiculo_list = function(req, res){
    Vehiculo.allVehis(function(err, vehis){
        res.status(200).json({
            vehiculos: vehis
        });    
    });
};

exports.vehiculo_create = function(req, res){
    var vehi =  Vehiculo.createInstance(req.body.code, req.body.nombre, req.body.apellido, req.body.placa, req.body.color, req.body.modelo, req.body.año);
    
    Vehiculo.add(vehi, function(err, newVehi){
        res.status(200).json({
            vehiculo: vehi
        });
    });    
};

exports.vehiculo_delete = function(req, res){
    Vehiculo.removeByCode(req.body.code, function(err, vehi){
        res.status(204).send();
    });    
};