export class LocationModel {
  lat: number;
  lng: number;

  constructor(location) {
    if (location === null) {
      return
    }
    this.lat = location['location']['coordinates'][0];
    this.lng = location['location']['coordinates'][1];
  }
}
