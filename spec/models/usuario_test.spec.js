var mongoose = require('mongoose');
var Vehiculo = require('../../models/vehiculo');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', function(){
    beforeEach(function(done){         
        var mongoDB = 'mongodb://localhost/testdb'
        mongoose.connect(mongoDB, { useNewUrlParser: true});
        
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('we are conected to test database!');
            done();
        });
    });
    afterEach(function(done) {
        Reserva.deleteMany({}, function(err, succes){
            if (err) console.log(err);
            Usuario.deleteMany({}, function(err, success){
                if(err) console.log(err);
                Vehiculo.deleteMany({}, function(err, success){
                    if (err) console.log(err);
                    done();
                });
            });
        });
    });

    describe('Cuando un Usuario reserva un vehiculo', () =>{
        it('debe existir la reserva', (done) => {
            const usuario = new Usuario({nombre: 'Eduardo'});
            usuario.save();
            const vehiculo = new Vehiculo({code: 1, color: "verde", modelo: "trailblazer"});
            vehiculo.save(); 

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate()+1);
            usuario.reservar(vehiculo.id, hoy, mañana, function(err, reserva){
                Reserva.find({}).populate('vehiculo').populate('usuario').exec(function(err, reservas){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].vehiculo.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();                
                });
            });            
        });
    });
});