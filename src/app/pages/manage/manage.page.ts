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

  manageButtons = [
    {
      name: 'Room',
      icon: 'bed-outline',
      toDo: (dormitoryId: number) => {
        this.openAddRoomModal(dormitoryId);
      },
    },
    {
      name: 'Document',
      icon: 'document-text-outline',
      toDo: (dormitoryId: number) => {
        this.openAddDocumentModal(dormitoryId);
      },
    },
    {
      name: 'Images',
      icon: 'images-outline',
      toDo: (dormitoryId: number) => {},
    },
    {
      name: 'Location',
      icon: 'location-outline',
      toDo: (dormitoryId: number) => {
        this.openAddLocationModal(dormitoryId);
      },
    },
    {
      name: 'Landmark',
      icon: 'location-outline',
      toDo: (dormitoryId: number) => {},
    },
    {
      name: 'Dormitory Image',
      icon: 'image-outline',
      toDo: (dormitoryId: number) => {},
    },
    {
      name: 'Amenities',
      icon: 'settings-outline',
      toDo: (dormitoryId: number) => {
        this.openAddAmenityModal(dormitoryId);
      },
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
      console.log('DORMITORY ID: ', dormitoryId);
      this.dormitoryId = dormitoryId;
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

  openAddLocationModal = async (dormitoryId: number) => {
    console.log('Opening Location Modal');
    const addLocationModal = await this.modalCtrl.create({
      component: AddLocationPage,
      componentProps: { dormitoryId: dormitoryId },
      cssClass: 'rounded-edges-modal',
    });
    addLocationModal.present();
  };
}
