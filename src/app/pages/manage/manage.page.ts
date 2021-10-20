import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HelperService } from 'src/app/services/helper.service';
import { AddAmenityPage } from '../add-amenity/add-amenity.page';
import { AddDocumentPage } from '../add-document/add-document.page';
import { AddLocationPage } from '../add-location/add-location.page';
import { AddRoomPage } from '../add-room/add-room.page';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  role = 'owner';
  dormitoryId: number;
  locationId: number;

  manageButtons = [
    {
      hover: 'Add Room',
      name: 'Room',
      icon: 'bed-outline',
      backgroundColor: '	#067d7a',
      // image: 'https://th.bing.com/th/id/R.38cd95fd9b5c36f07cb7283acb457abd?rik=9KyAWm1gpxL6uQ&riu=http%3a%2f%2fimages.clipartpanda.com%2flocation-icon-iphone-near-me.png&ehk=P4psrXav0nvYH93VgR%2bH52hOSydRzYWI3PJTxgTlvso%3d&risl=&pid=ImgRaw&r=0',
      toDo: (dormitoryId: number) => {
        this.openAddRoomModal(dormitoryId);
      },
    },
    {
      hover: 'Add Document',
      name: 'Document',
      icon: 'document-text-outline',
      toDo: (dormitoryId: number) => {
        this.openAddDocumentModal(dormitoryId);
      },
      backgroundColor: '#77c1b3',
    },
    {
      hover: 'Add Images',
      name: 'Images',
      icon: 'images-outline',
      backgroundColor: '#f3c759',
      toDo: (dormitoryId: number) => {},
    },
    {
      hover: 'Add Location',
      name: 'Location',
      icon: 'location-outline',
      backgroundColor: '#ed7364',
      toDo: (dormitoryId: number) => {
        this.openAddLocationModal(dormitoryId, this.locationId);
      },
    },
    {
      hover: 'Add Landmark',
      name: 'Landmark',
      icon: 'location-outline',
      backgroundColor: '	#b63653',
      toDo: (dormitoryId: number) => {},
    },
    {
      hover: 'Add Banner',
      name: 'Dormitory Banner',
      icon: 'image-outline',
      backgroundColor: '#337019',
      toDo: (dormitoryId: number) => {},
    },
    {
      hover: 'Add Amenities',
      name: 'Amenities',
      icon: 'settings-outline',
      toDo: (dormitoryId: number) => {
        this.openAddAmenityModal(dormitoryId);
      },
      backgroundColor: '	#c8caa4',
    },
  ];

  constructor(
    private helperService: HelperService,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.helperService.checkRole(this.role, this.authGuard.userRole);
  }

  ionViewDidEnter = () => {
    this.getParamsValue();
  };

  getParamsValue = () => {
    this.route.queryParams.subscribe((passed_value) => {
      const dormitoryId = parseInt(passed_value.dormitoryId);
      const locationId = parseInt(passed_value.locationId);
      this.dormitoryId = dormitoryId;
      this.locationId = locationId;
    });
  };

  goBackToDetailPage = (dormitoryId: number) => {
    this.router.navigate([`/owner-tabs/dormitory-detail/${dormitoryId}`]);
  };

  openAddRoomModal = async (dormitoryId: number) => {
    const addRoomModal = await this.modalCtrl.create({
      component: AddRoomPage,
      componentProps: { dormitoryId: dormitoryId },
      cssClass: 'rounded-edges-modal',
    });
    addRoomModal.present();
  };

  openAddDocumentModal = async (dormitoryId: number) => {
    console.log('Opening Document Modal');
    const addDocumentModal = await this.modalCtrl.create({
      component: AddDocumentPage,
      componentProps: { dormitoryId: dormitoryId },
      cssClass: 'rounded-edges-modal',
    });
    addDocumentModal.present();
  };

  openAddAmenityModal = async (dormitoryId: number) => {
    console.log('Opening Amenity Modal');
    const addAmenityModal = await this.modalCtrl.create({
      component: AddAmenityPage,
      componentProps: { dormitoryId: dormitoryId },
      cssClass: 'rounded-edges-modal',
    });
    addAmenityModal.present();
  };

  openAddLocationModal = async (dormitoryId: number, locationId: number) => {
    console.log('Opening Location Modal');
    const addLocationModal = await this.modalCtrl.create({
      component: AddLocationPage,
      componentProps: { dormitoryId: dormitoryId, locationId: locationId },
      cssClass: 'rounded-edges-modal',
    });
    addLocationModal.present();
  };
}
