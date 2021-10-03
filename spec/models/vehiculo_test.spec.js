var Vehiculo = require('../../models/vehiculo');

beforeEach(() => { Vehiculo.allVehis = []; });

describe('Vehiculo.allVehis', () => {
    it('comienza vacia', () => {
        expect(Vehiculo.allVehis.length).toBe(0);
    });
});

describe('Vehiculo.add', () => {
    it('agregamos una', () => {
        expect(Vehiculo.allVehis.length).toBe(0);

        var a = new Vehiculo(14840089, 'eduardo', 'leon', 'agd82e', 'beige', 'trailblazer', 2007);
        Vehiculo.add(a); 

        expect(Vehiculo.allVehis.length).toBe(1);
        expect(Vehiculo.allVehis[0]).toBe(a);

    });
});

describe('Vehiculo.findById', () => {
    it('debe devolver el vehiculo con id 13341346', () => {
        expect(Vehiculo.allVehis.length).toBe(0);
        var aVehi = new Vehiculo(13341346, 'francis', 'gonzalez', 'labo7c', 'beige', 'corsa', 2000);
        var aVehi2 = new Vehiculo(12920708, 'sonyram', 'acosta', 'aa924ro', 'blanco', 'corolla', 2011);
        Vehiculo.add(aVehi);
        Vehiculo.add(aVehi2);

        var targetVehi = Vehiculo.findById(13341346);
        expect(targetVehi.id).toBe(13341346);
        expect(targetVehi.nombre).toBe(aVehi.nombre);
        expect(targetVehi.apellido).toBe(aVehi.apellido);
        expect(targetVehi.placa).toBe(aVehi.placa);
        expect(targetVehi.color).toBe(aVehi.color);
        expect(targetVehi.modelo).toBe(aVehi.modelo);
        expect(targetVehi.año).toBe(aVehi.año);






    });
});