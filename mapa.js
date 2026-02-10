const map = L.map('map').setView([1, -72], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'OpenStreetMap'
}).addTo(map);

const url =
"https://gis.siatac.co/arcgis/rest/services/MAC_DatosAbiertos/Cob_Region_100K_2007/FeatureServer/0/query?where=1=1&outFields=*&f=geojson";

fetch(url)
  .then(res => res.json())
  .then(data => {

    const capa = L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "#2e7d32",
          weight: 1,
          fillOpacity: 0.5
        };
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "Cobertura: " + (feature.properties.NIVEL_1 || "Sin dato")
        );
      }
    });

    capa.addTo(map);
    map.fitBounds(capa.getBounds());
  });