var Reserva = require('../models/reserva');

exports.reserva_list = function(req, res){
    Reserva.allVehis(function(err, vehis){
        res.render('reservas/index', {vehis: vehis});
    });
}

exports.reserva_create_get = function(req, res){
    res.render('reservas/create');
}

exports.reserva_create_post = function(req, res){
    var vehi = new Reserva({code: req.body.id, nombre: req.body.nombre, apellido: req.body.apellido, placa:req.body.placa, color: req.body.color, modelo: req.body.modelo, año: req.body.año});
    Reserva.add(vehi);

    res.redirect('/reservas');

}