import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AddAmenityPage } from '../add-amenity/add-amenity.page';
import { AddBannerPage } from '../add-banner/add-banner.page';
import { AddDocumentPage } from '../add-document/add-document.page';
import { AddImagePage } from '../add-image/add-image.page';
import { AddLandmarkPage } from '../add-landmark/add-landmark.page';
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

  deleteDormitoryToggle: boolean = false;

  manageButtons = [
    {
      hover: 'Add Room',
      name: 'Room',
      icon: 'bed-outline',
      backgroundColor: '	#067d7a',

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
      toDo: (dormitoryId: number) => {
        this.openAddImageModal(dormitoryId);
      },
    },
    {
      hover: 'Add Location',
      name: 'Location',
      icon: 'map-outline',
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
      toDo: (dormitoryId: number, locationId: number) => {
        this.openAddLandmarkModal(dormitoryId, locationId);
      },
    },
    {
      hover: 'Add Banner',
      name: 'Dormitory Banner',
      icon: 'image-outline',
      backgroundColor: '#337019',
      toDo: (dormitoryId: number) => {
        this.openAddBannerModal(dormitoryId);
      },
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
    {
      hover: 'Delete Dorm',
      name: 'Delete Dormitory',
      icon: 'Trash',
      toDo: () => {
        this.toggleDelete();
      },
      backgroundColor: 'chocolate',
    },
  ];

  constructor(
    private helperService: HelperService,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private dormitoriesService: DormitoriesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.helperService.checkRole(this.role, this.authGuard.userRole);
  }

  ionViewDidEnter = () => {
    this.getParamsValue();
  };

  ionViewDidLeave = () => {
    this.deleteDormitoryToggle = false;
  };

  getParamsValue = () => {
    this.route.queryParams.subscribe((passed_value) => {
      const dormitoryId = parseInt(passed_value.dormitoryId);
      const locationId = parseInt(passed_value.locationId);
      this.dormitoryId = dormitoryId;
      this.locationId = locationId;
    });
  };

  toggleDelete = () => {
    this.deleteDormitoryToggle = !this.deleteDormitoryToggle;
  };

  deleteDormitoryAction = (dormitoryId: number) => {
    this.loadingService.createNewLoading('Deleting dormitory please wait...');
    this.dormitoriesService
      .deleteDormitoryRequest(dormitoryId)
      .then((response) => {
        response.subscribe((responseData) => {
          this.loadingService.dismissLoading();
          this.router.navigate(['owner-tabs']);
        });
      });
  };

  goBackToDetailPage = (dormitoryId: number) => {
    this.router.navigate([`/owner-tabs/dormitory-detail/${dormitoryId}`]);
  };

  openAddRoomModal = async (dormitoryId: number) => {
    this.openNewModal(AddRoomPage, dormitoryId);
  };

  openAddDocumentModal = async (dormitoryId: number) => {
    this.openNewModal(AddDocumentPage, dormitoryId);
  };

  openAddAmenityModal = async (dormitoryId: number) => {
    this.openNewModal(AddAmenityPage, dormitoryId);
  };

  openAddLocationModal = async (dormitoryId: number, locationId: number) => {
    this.openNewModal(AddLocationPage, dormitoryId, locationId);
  };

  openAddImageModal = async (dormitoryId: number) => {
    this.openNewModal(AddImagePage, dormitoryId);
  };

  openAddBannerModal = async (dormitoryId: number) => {
    this.openNewModal(AddBannerPage, dormitoryId);
  };

  openAddLandmarkModal = async (dormitoryId: number, locationId: number) => {
    this.openNewModal(AddLandmarkPage, dormitoryId, locationId);
  };

  openNewModal = async (
    pageToLoad: any,
    dormitoryId: number,
    locationId: number = null
  ) => {
    let params: {} = {};

    if (locationId === null) {
      params = { dormitoryId };
    } else if (locationId !== null) {
      params = { dormitoryId, locationId };
    }

    const openModal = await this.modalCtrl.create({
      component: pageToLoad,
      componentProps: params,
      cssClass: 'rounded-edges-modal',
      backdropDismiss: false,
    });
    openModal.present();
  };
}
