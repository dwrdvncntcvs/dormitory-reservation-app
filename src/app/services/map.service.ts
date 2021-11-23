import { Injectable } from '@angular/core';
import { map, Marker, marker, tileLayer } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: any;
  lat: number;
  lng: number;

  constructor() {}

  createNewMap = (elementId, lat: number, lng: number, zoom: number) => {
    const dormitoryMap = map(elementId).setView([lat, lng], zoom);
    this.map = dormitoryMap;

    dormitoryMap.addEventListener('click', () => {});

    return dormitoryMap;
  };

  createNewTile = (map: any) => {
    tileLayer(
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
  };

  getLatLng = (event) => {
    const lat = event['latlng'].lat;
    const lng = event['latlng'].lng;
    this.lat = lat;
    this.lng = lng;
  };

  createNewMarkerObj = (map, location) => {
    if (location === null) {
      return;
    }
    const coordinates = location['location'].coordinates;
    let myMarker = marker(coordinates).addTo(map);
    return myMarker;
  };

  createNewMarkerArr = (map, locations) => {
    for (let location of locations) {
      const coordinates = location['location'].coordinates;
      let myMarker = marker(coordinates).addTo(map);
    }
  };
}
