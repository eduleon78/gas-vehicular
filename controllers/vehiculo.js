var Vehiculo = require('../models/vehiculo');

exports.vehiculo_list = function(req, res){
    Vehiculo.allVehis(function(err, vehis){
        res.render('vehiculos/index', {vehis: vehis});
    });
}

exports.vehiculo_create_get = function(req, res){
    res.render('vehiculos/create');
}

exports.vehiculo_create_post = function(req, res){
    var vehi = new Vehiculo({code: req.body.id, nombre: req.body.nombre, apellido: req.body.apellido, placa:req.body.placa, color: req.body.color, modelo: req.body.modelo, año: req.body.año});
    Vehiculo.add(vehi);

    res.redirect('/vehiculos');
}

exports.vehiculo_update_get = function(req, res){
    var vehi = Vehiculo.findById(req.params.id);

    res.render('vehiculos/update', {vehi});
}

exports.vehiculo_update_post = function(req, res){
    var vehi = Vehiculo.findById(req.params.id);
    vehi.id = req.body.id;
    vehi.nombre = req.body.nombre;
    vehi.apellido = req.body.apellido;
    vehi.placa = req.body.placa;
    vehi.color = req.body.color;
    vehi.modelo = req.body.modelo;
    vehi.año = req.body.año;

    res.redirect('/vehiculos');
}

exports.vehiculo_delete_post = function(req, res){
    Vehiculo.removeById(req.body.id);
    

    res.redirect('/vehiculos');
}