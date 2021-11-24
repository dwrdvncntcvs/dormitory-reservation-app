export class LocationModel {
  lat: number;
  lng: number;
  locationId: number;

  constructor(location) {
    if (location === null) {
      return
    }
    this.locationId = location.id;
    this.lat = location['location']['coordinates'][0];
    this.lng = location['location']['coordinates'][1];
  }
}
