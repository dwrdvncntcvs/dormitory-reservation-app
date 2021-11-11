import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { icon, Map, Marker } from 'leaflet';
import { LocationModel } from 'src/app/models/locationModel';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { MapService } from 'src/app/services/map.service';

var marker = null;

@Component({
  selector: 'app-add-landmark',
  templateUrl: './add-landmark.page.html',
  styleUrls: ['./add-landmark.page.scss'],
})
export class AddLandmarkPage implements OnInit {
  map: Map;
  dormitoryId: number;
  locationId: number;
  locationData: LocationModel;
  marker: Marker;

  isCreated: boolean;
  successMessage: string = '';
  errorMessage: string = '';

  landMarkName: string = '';
  longitude: number;
  latitude: number;
  clickCounter: number = 0;

  lat: number;
  lng: number;

  buttons = [
    {
      name: 'Add Landmark',
      state: () => {
        const isCreated = false;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.addLandMarkAction(dormitoryId);
      },
    },
    {
      name: 'Add Another Landmark',
      state: () => {
        const isCreated = true;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.addAnotherLandmarkAction();
      },
    },
    {
      name: 'Done',
      state: () => {
        const isCreated = true;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.doneCreatingLandmark(dormitoryId);
      },
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    private mapService: MapService,
    private navParams: NavParams,
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isCreated = false;
    this.getParamsValue();
    this.getDormitoryLocation();
  }

  closeModal = () => {
    this.modalCtrl.dismiss();
  };

  getParamsValue = () => {
    this.dormitoryId = this.navParams.get('dormitoryId');
    this.locationId = this.navParams.get('locationId');
    console.log('Dormitory ID', this.dormitoryId);
    console.log('Location ID', this.locationId);
  };

  getMap = (lat: number, lng: number) => {
    let actualMap;
    if (lat === null && lng === null) {
      actualMap = this.mapService.createNewMap(
        'map4',
        13.7543236494,
        121.054866447,
        12.5
      );
    } else if (lat !== null && lng !== null) {
      console.log(lat, lng);
      actualMap = this.mapService.createNewMap('map4', lat, lng, 15);
    }

    this.mapService.createNewTile(actualMap);

    this.map = actualMap;

    actualMap.on('click', (event) => {
      this.addMarker(event, actualMap);
    });

    actualMap.whenReady(() => {
      setInterval(() => {
        actualMap.invalidateSize();
      }, 0);
    });
  };

  addAnotherLandmarkAction = () => {
    this.getDormitoryLocation();
    this.isCreated = false;
    this.landMarkName = '';
    this.latitude = null;
    this.longitude = null;
    this.map.removeLayer(this.marker);
    this.errorMessage = '';
    this.successMessage = '';
    this.map.on('click', (event) => {
      this.addMarker(event, this.map);
    });
  };

  getDormitoryLocation = () => {
    let locationId = this.locationId.toString();
    if (locationId == 'NaN') {
      const lat = null;
      const lng = null;
      this.getMap(lat, lng);
    }
    this.dormitoriesService
      .getDormitoryLocationRequest(this.dormitoryId, this.locationId)
      .then((response) => {
        response.subscribe((responseData) => {
          console.log(responseData);
          const location = responseData['dormLocation'];
          console.log(location);
          const lat = location['location']['coordinates'][0];
          const lng = location['location']['coordinates'][1];
          console.log('LAT: ', lat, ' LNG: ', lng);
          this.getMap(lat, lng);
          this.lat = lat;
          this.lng = lng;
          this.mapService.createNewMarkerObj(this.map, location);
        });
      });
  };

  doneCreatingLandmark = (dormitoryId: number) => {
    console.log('DORMITORY ID: ', dormitoryId);
    this.router.navigate([`/owner-tabs/dormitory-detail/${dormitoryId}`]);
    this.modalCtrl.dismiss();
  };

  addLandMarkAction = (dormitoryId: number) => {
    return this.dormitoriesService
      .addLandmarkRequest(
        this.landMarkName,
        dormitoryId,
        this.longitude,
        this.latitude
      )
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log(responseData);
            this.isCreated = true;
            this.successMessage = 'Landmark successfully added';
            this.errorMessage = '';
            this.map.remove();
            this.getDormitoryLocation();
            setTimeout(() => {
              this.successMessage = '';
            }, 5000);
          },
          (err) => {
            console.log(err);
            this.errorMessage = err['error'].msg;
            this.successMessage = '';
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
          }
        );
      });
  };

  addMarker = (event, actualMap: Map) => {
    this.mapService.getLatLng(event);
    const lat = this.mapService.lat;
    const lng = this.mapService.lng;
    console.log(lat, lng);
    this.latitude = lat;
    this.longitude = lng;
    const location = { location: { coordinates: [lat, lng] } };
    if (marker !== null) {
      actualMap.removeLayer(marker);
    }
    const markerIcon = icon({
      iconUrl: '../../assets/icon/pin.svg',
      iconSize: [30, 30],
    });
    marker = this.mapService
      .createNewMarkerObj(actualMap, location)
      .setIcon(markerIcon);
    console.log(marker);
    this.marker = marker;
  };
}
