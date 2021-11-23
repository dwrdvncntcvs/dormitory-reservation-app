import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-add-amenity',
  templateUrl: './add-amenity.page.html',
  styleUrls: ['./add-amenity.page.scss'],
})
export class AddAmenityPage implements OnInit {
  dormitoryId: number;
  isCreated: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  amenityDetail = {
    amenity: '',
  };

  buttons = [
    {
      name: 'Add Amenity',
      state: () => {
        const isCreated = false;
        return isCreated === !this.isCreated;
      },
      disable: () => {
        if (this.amenityDetail.amenity !== '') {
          return false;
        } else if (this.amenityDetail.amenity === '') {
          return true;
        }
      },
      toDo: (dormitoryId: number) => {
        this.addAmenityAction(dormitoryId);
      },
    },
    {
      name: 'Add Another Amenity',
      disable: () => {
        return false;
      },
      state: () => {
        const isCreated = true;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.addAnotherAmenityAction();
      },
    },
    {
      name: 'Done',
      disable: () => {
        return false;
      },
      state: () => {
        const isCreated = true;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.doneAddingAmenity(dormitoryId);
      },
    },
  ];

  constructor(
    private navParams: NavParams,
    private router: Router,
    private modalCtrl: ModalController,
    private dormitoriesService: DormitoriesService,
    private loadingService: LoadingService
  ) {
    this.getNavParams();
  }

  ngOnInit() {}

  getNavParams = () => {
    const paramsValue = this.navParams.get('dormitoryId');
    this.dormitoryId = paramsValue;
  };

  addAmenityAction = (dormitoryId: number) => {
    this.loadingService.createNewLoading('Adding amenity please wait...');
    this.dormitoriesService
      .createAmenityRequest(this.amenityDetail, dormitoryId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            this.successMessage = responseData['msg'];
            this.isCreated = true;
            this.loadingService.dismissLoading();
            setInterval(() => {
              this.successMessage = '';
            }, 5000);
          },
          (err) => {
            this.errorMessage = err['error'].msg;
            this.loadingService.dismissLoading();
            setInterval(() => {
              this.errorMessage = '';
            }, 5000);
          }
        );
      });
  };

  addAnotherAmenityAction = () => {
    this.isCreated = false;
    this.amenityDetail.amenity = '';
    this.errorMessage = '';
    this.successMessage = '';
  };

  doneAddingAmenity = (dormitoryId: number) => {
    this.isCreated = false;
    this.amenityDetail.amenity = '';
    this.router.navigate([`/owner-tabs/dormitory-detail/${dormitoryId}`]);
    this.modalCtrl.dismiss();
  };

  closeModal = () => {
    this.modalCtrl.dismiss();
  };
}
