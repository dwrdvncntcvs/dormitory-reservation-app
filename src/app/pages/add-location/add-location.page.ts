import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Map } from 'leaflet';
import { LocationModel } from 'src/app/models/locationModel';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage implements OnInit {
  map: Map;
  dormitoryId: number;
  locationId: number;
  locationData: LocationModel;
  doHaveLocation: boolean;

  longitude: number = null;
  latitude: number = null;
  clickCounter: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private mapService: MapService,
    private navParams: NavParams,
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getParamsValue();
    this.getMap();
    this.getLocationAction();
  }

  closeModal = () => {
    this.modalCtrl.dismiss();
  };

  getParamsValue = () => {
    this.dormitoryId = this.navParams.get('dormitoryId');
    this.locationId = this.navParams.get('locationId');
  };

  getMap = () => {
    const actualMap = this.mapService.createNewMap(
      'map3',
      13.7543236494,
      121.054866447,
      12.5
    );
    this.mapService.createNewTile(actualMap);

    this.map;

    var marker = null;

    const doHaveLocation = this.getLocationAction();

    if (doHaveLocation === false) {
      actualMap.on('click', (event) => {
        this.mapService.getLatLng(event);
        this.clickCounter++;
        const lat = this.mapService.lat;
        const lng = this.mapService.lng;
        console.log(lat, lng);
        this.latitude = lat;
        this.longitude = lng;
        const location = { location: { coordinates: [lat, lng] } };
        if (marker !== null) {
          actualMap.removeLayer(marker);
        }
        marker = this.mapService.createNewMarkerObj(actualMap, location);
      });
    }

    actualMap.whenReady(() => {
      setInterval(() => {
        actualMap.invalidateSize();
      }, 0);
    });
  };

  addLocationAction = (dormitoryId: number) => {
    console.log(this.latitude, this.longitude);
    console.log(this.dormitoryId);
    this.dormitoriesService
      .createDormitoryLocationRequest(
        this.latitude,
        this.longitude,
        dormitoryId
      )
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.modalCtrl.dismiss();
            this.router.navigate([
              `/owner-tabs/dormitory-detail/${dormitoryId}`,
            ]);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };

  getLocationAction = () => {
    const dormitoryId = this.dormitoryId;
    const locationId = this.locationId;
    const locationIdStr = locationId.toString();
    if (locationIdStr === 'NaN') {
      console.log('No Location Found');
      this.doHaveLocation = false;
      return false;
    } else {
      this.dormitoriesService
        .getDormitoryLocationRequest(dormitoryId, locationId)
        .then((response) => {
          response.subscribe(
            (responseData) => {
              console.log(responseData);
              this.doHaveLocation = true;
              const location = responseData['dormLocation'];
              this.locationData = new LocationModel(location);
              this.latitude = this.locationData.lat;
              this.longitude = this.locationData.lng;
            },
            (err) => console.log(err)
          );
        });

      return true;
    }
  };
}
