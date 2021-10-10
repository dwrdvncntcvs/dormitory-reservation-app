import * as L from 'leaflet';

export const api = {
  // url: 'https://b8b3-136-158-30-56.ngrok.io'
  url: 'http://localhost:3000',
};

export const mapApi = (map) => {
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHdyZHZuY250Y3ZzIiwiYSI6ImNrdWk3bHIzaTA3NnoycG82ZGpoNXcwbWQifQ.95bfWfAbp2yXB3dNL06Urw',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token',
    }
  ).addTo(map);
}
