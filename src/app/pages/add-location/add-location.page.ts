import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage implements OnInit {
  dormitoryId: number;
  longitude: number;
  latitude: number;
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
  }

  closeModal = () => {
    this.modalCtrl.dismiss();
  };

  getParamsValue = () => {
    this.dormitoryId = this.navParams.get('dormitoryId');
  };

  getMap = () => {
    const actualMap = this.mapService.createNewMap(
      'map3',
      13.7543236494,
      121.054866447,
      12.5
    );
    this.mapService.createNewTile(actualMap);

    var marker = null;

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
}
