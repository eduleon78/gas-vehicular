var mymap = L.map('main_map').setView([10.946533, -63.916878], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

L.marker([10.946533, -63.916878]).addTo(mymap)
    .bindPopup('Estacion de Servicio.<br> Para surtir Gas Vehicular.')
    .openPopup();