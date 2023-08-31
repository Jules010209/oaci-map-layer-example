let mainLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
});

let oaciLayer = L.tileLayer('https://sdoaci.skydreamsoft.fr/current_cycle/Z{z}/{y}/{x}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const getNewestLayer = async() => {
    return await fetch('https://api.rainviewer.com/public/maps.json')
        .then((response) => {
            if(!response.ok) {
                throw new Error();
            }

            return response.json();
        })
        .then(timestamps => timestamps.sort())
        .then(timestamps => {
            return L.tileLayer(`https://tilecache.rainviewer.com/v2/radar/${timestamps[timestamps.length - 1]}/256/{z}/{x}/{y}/2/1_1.png`, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        })
        .catch(err => console.error(err));
}

getNewestLayer();

setTimeout(getNewestLayer(), 10000);

var layers = L.layerGroup([mainLayer, oaciLayer]);

var map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 10,
    layers
});