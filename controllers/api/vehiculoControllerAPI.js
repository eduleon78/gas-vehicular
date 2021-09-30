var Vehiculo = require('../../models/vehiculo');

exports.vehiculo_list = function(req, res){
    res.status(200).json({
        vehiculos: Vehiculo.allVehis
    });
}

exports.vehiculo_create = function(req, res){
    var vehi =  new Vehiculo(req.body.id, req.body.nombre, req.body.apellido, req.body.placa, req.body.color, req.body.modelo, req.body.año);

    Vehiculo.add(vehi);

    res.status(200).json({
        vehiculo: vehi
    });
}

exports.vehiculo_delete = function(req, res){
    Vehiculo.removeById(req.body.id);
    res.status(204).send();
}