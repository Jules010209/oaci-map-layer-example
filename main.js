let mainLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
});

let oaciLayer = L.tileLayer('https://sdoaci.skydreamsoft.fr/current_cycle/Z{z}/{y}/{x}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var layers = L.layerGroup([mainLayer, oaciLayer]);

var map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 10,
    layers
});