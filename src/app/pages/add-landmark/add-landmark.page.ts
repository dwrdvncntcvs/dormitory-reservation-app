import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Map, Marker } from 'leaflet';
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
    this.getMap();
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
      'map4',
      13.7543236494,
      121.054866447,
      12.5
    );
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
            this.map.off();
          },
          (err) => {
            console.log(err);
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
    marker = this.mapService.createNewMarkerObj(actualMap, location);
    console.log(marker);
    this.marker = marker;
  };
}
