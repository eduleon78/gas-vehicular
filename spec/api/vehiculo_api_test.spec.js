var mongoose = require('mongoose');
var Vehiculo= require('../../models/vehiculo');
var request = require('request');
var server = require('../../bin/www');

var base_url = "http://localhost:5000/api/vehiculos";

describe('Vehiculo API', () => {
    beforeEach(function(done){
        const mongoose = require('mongoose');

        main().catch(err => console.log(err));

        async function main() {
        await mongoose.connect('mongodb://localhost:27017/test');
        }
    });

    afterEach(function(done){
        Vehiculo.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
    });

    describe("GET VEHICULOS /", () => {
        it("Status 200", (done) => {
            request.get(base_url, function(error, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.vehiculos.length).toBe(0);
                done();
            });
        });
    });

    describe('POST VEHICULOS /create', () => {
        it('Status 200', (done) => {
            var headers = {'content-type': 'application/json'};
            var aVehi = '{ "code": 14840089, "nombre": "eduardo", "apellido": "leon", "placa": "agd82e", "modelo": "trailblazer",  "año": 2007}';
            request.post({
                headers: headers,
                url:    base_url + '/create',
                body:   aVehi
              }, function(error, response, body){
                 expect(response.statusCode).toBe(200);
                 var vehi = JSON.parse(body).vehiculo;
                 console.log(vehi);
                 expect(vehi.nombre).toBe("eduardo");
                 expect(vehi.apellido).toBe("eduardo");
                 done();
            });        
        });
    });
});