var Vehiculo = function (id, nombre, apellido, placa, color, modelo, año){
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.placa = placa;
    this.color = color;
    this.modelo = modelo;
    this.año = año;
}

Vehiculo.prototype.toString = function(){
    return 'id: ' + this.id + " | color: " + this.color;
}

Vehiculo.allVehis = [];
Vehiculo.add = function(aVehi){
    Vehiculo.allVehis.push(aVehi);
}

Vehiculo.findById = function(aVehiId){
    var aVehi = Vehiculo.allVehis.find(x => x.id == aVehiId);
    if (aVehi)
        return aVehi;
    else
        throw new Error(`No existe un veiculo con el id ${aVehiId}`);
}

Vehiculo.removeById = function(aVehiId){
    for(var i = 0; i < Vehiculo.allVehis.length; i++){
        if (Vehiculo.allVehis[i].id == aVehiId){
            Vehiculo.allVehis.splice(i, 1);
            break;
        }
    }
}

/* var a = new Vehiculo(14840089, 'eduardo', 'leon', 'agd82e', 'beige', 'trailblazer', 2007);
var b = new Vehiculo(12920708, 'sonyram', 'acosta', 'aa924ro', 'blanco', 'corolla', 2011);

Vehiculo.add(a);
Vehiculo.add(b); */

module.exports = Vehiculo;