// Año por defecto
const DEFAULT_YEAR = 2012;

// URLs de GeoJSON de ejemplo
const GEOJSON_URLS = {
    2012: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries/ESP.geo.json', // España
    2013: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries/FRA.geo.json'  // Francia
};

// Crear mapa
const map = L.map('map').setView([46, 2], 5);

// Capa base OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Capa GeoJSON activa
let geojsonLayer = null;

// Limpiar capa
function clearGeoJSON() {
    if (geojsonLayer) {
        map.removeLayer(geojsonLayer);
        geojsonLayer = null;
    }
}

// Cargar GeoJSON según año
function loadGeoJSON(year) {
    const url = GEOJSON_URLS[year];
    if (!url) {
        clearGeoJSON();
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            clearGeoJSON();

            geojsonLayer = L.geoJSON(data, {
                style: {
                    color: year == 2012 ? 'red' : 'blue',
                    weight: 4,
                    fillOpacity: 0.3
                }
            }).addTo(map);

            map.fitBounds(geojsonLayer.getBounds(), { padding: [20, 20] });

            // Actualizar descripción inferior
            const description = document.getElementById('description');
            description.textContent = year == 2012 ? 'País mostrado: España' : 'País mostrado: Francia';
        })
        .catch(err => console.error('Error cargando GeoJSON:', err));
}

// DOM
const slider = document.getElementById('yearSlider');
const yearLabel = document.getElementById('yearLabel');

// Estado inicial
slider.value = DEFAULT_YEAR;
yearLabel.textContent = DEFAULT_YEAR;
loadGeoJSON(DEFAULT_YEAR);

// Evento slider
slider.addEventListener('input', () => {
    const year = slider.value;
    yearLabel.textContent = year;
    loadGeoJSON(year);
});
