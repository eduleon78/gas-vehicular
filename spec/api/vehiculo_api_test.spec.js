var Vehiculo= require('../../models/vehiculo');
var request = require('request');
var server = require('../../bin/www');

describe('Vehiculo API', () => {
    describe('GET VEHICULOS /', () =>{
        it('Status 200', () => {
            expect(Vehiculo.allVehis.length).toBe(0);

            var a = new Vehiculo(14840089, 'eduardo', 'leon', 'agd82e', 'beige', 'trailblazer', 2007);
            Vehiculo.add(a);

            request.get('http://localhost:5000/api/vehiculos', function(error, response, body){
                expect(response.statusCode).toBe(200);

            });
        });
    });

    describe('POST VEHICULOS /create', () => {
        it('STATUS 200', (done) => {
            var headers = {'content-type': 'application/json'};
            var aVehi = '{ "id": 14840089, "nombre": eduardo, "apellido": leon, "placa": "aged82e", "modelo": treailblazer,  "año": 2007}';
            request.post({
                headers: headers,
                url:    'http://localhost:5000/api/vehiculos/create',
                body:   aVehi
              }, function(error, response, body){
                 expect(response.statusCode).toBe(400);
                 expect(Vehiculo.findById(14840089).nombre).toBe("eduardo");
                 done();
            });        
        });
    });
});