var mongoose = require('mongoose');
var Vehiculo = require('../../models/vehiculo');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/vehiculo');

describe('Testing Vehiculos', function(){
    beforeEach(function(done){
        const mongoose = require('mongoose');

        main().catch(err => console.log(err));
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('we are conected to test database!');
            done();
        })
        async function main() {
        await mongoose.connect('mongodb://localhost:27017/test');
        }
    });
    afterEach(function(done) {
        Vehiculo.deleteMany({}, function(err, succes){
            if (err) console.log(err);
            done();
        });
    });

    describe('Vehiculo.createInstance', () =>{
        it('crea una instancia de Vehiculo', () => {
            var vehi = Vehiculo.createInstance(14840089, "eduardo", "leon", "agd82e", "beige", "trailblazer", 2007);

            expect(vehi.code).toBe(14840089);
            expect(vehi.nombre).toBe("eduardo");
            expect(vehi.apellido).toBe("leon");
            expect(vehi.placa).toBe("agd82e");
            expect(vehi.color).toBe("beige");
            expect(vehi.modelo).toBe("trailblazer");
            expect(vehi.año).toBe(2007);

        })
    });
    describe('Vehiculo.allVehis', () => {
        it('comienza vacia', (done) => {
            Vehiculo.allVehis(function(err, vehis){
                expect(vehis.lenght).toBe(0);
                done();
            });
        });
    });
    describe('Vehiculo.add', () => {
        it('agrega solo un vehi', (done) => {
            Vehiculo.allVehis(function(err, vehis){
                expect(vehis.lenght).toBe(0);
                done();
            });
        });
    });

    describe('Vehiculo.findByCode', () => {
        it('debe devolver el vehi con code 1', (done) => {
            Vehiculo.allVehis(function(err, vehis){
                expect(vehis.lenght).toBe(0);

                var aVehi = new Vehiculo({code: 1, nombre: "eduardo", apellido: "leon", placa: "agd82e", color: "beige", modelo: "trailblazer", año: 2007});
                Vehiculo.add(aVehi, function(err, newVehi){
                    if (err) console.log(err);

                    var aVehi2 = new Vehiculo({code: 2, nombre: "sonyram", apellido: "acosta", placa: "oas642", color: "blanco", modelo: "chevete", año: 1987});
                    Vehiculo.add(aVehi2, function(err, newVehi){
                        if (err) console.log(err);
                        Vehiculo.findByCode(1, function (error, targetVehi){
                            expect(targetVehi.code).toBe(aVehi.code);
                            expect(targetVehi.nombre).toBe(aVehi.nombre);
                            expect(targetVehi.apellido).toBe(aVehi.apellido);
                            expect(targetVehi.placa).toBe(aVehi.placa);
                            expect(targetVehi.color).toBe(aVehi.color);
                            expect(targetVehi.modelo).toBe(aVehi.modelo);
                            expect(targetVehi.año).toBe(aVehi.año);

                            done();
                        });
                    });
                });
            });
        });
    });
});