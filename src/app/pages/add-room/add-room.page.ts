import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage implements OnInit {
  dormitoryId: number;
  isCreated: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  roomDetails = {
    roomName: '',
    activeTenant: '',
    roomCapacity: '',
    roomCost: '',
    electricBill: '',
    waterBill: '',
  };

  roomCapacity = [
    {
      capacity: 1,
    },
    {
      capacity: 2,
    },
    {
      capacity: 3,
    },
    {
      capacity: 4,
    },
    {
      capacity: 5,
    },
    {
      capacity: 6,
    },
  ];

  buttons = [
    {
      name: 'Create Room',
      state: () => {
        const isCreated = false;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.createRoomAction(dormitoryId);
      },
    },
    {
      name: 'Add Another Room',
      state: () => {
        const isCreated = true;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.addAnotherRoomAction();
      },
    },
    {
      name: 'Done',
      state: () => {
        const isCreated = true;
        return isCreated === !this.isCreated;
      },
      toDo: (dormitoryId: number) => {
        this.doneCreatingRoom(dormitoryId);
      },
    },
  ];

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private router: Router,
    private dormitoriesService: DormitoriesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getParamsValue();
  };

  closeModal = () => {
    this.modalCtrl.dismiss();
  };

  fadeOuterrorMsg() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  fadeOutsuccessMsg() {
    setTimeout(() => {
      this.successMessage = '';
    }, 4000);
  }

  getParamsValue = () => {
    const paramsValue = this.navParams.get('dormitoryId');
    this.dormitoryId = paramsValue;
  };

  createRoomAction = (dormitoryId: number) => {
    console.log('Room Details: ', this.roomDetails);
    console.log('Dormitory ID: ', dormitoryId);
    this.loadingService.createNewLoading('Creating room please wait . . .')
    this.dormitoriesService
      .createRoomRequest(this.roomDetails, dormitoryId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log('Response Data: ', responseData);
            this.fadeOutsuccessMsg();
            this.successMessage = 'Room Successfully Created.';
            this.errorMessage = '';
            this.isCreated = true;
            this.loadingService.dismissLoading();
          },
          (err) => {
            console.log(err);
            this.fadeOuterrorMsg();
            this.errorMessage = err['error'].msg;
            this.fadeOutsuccessMsg();
            this.successMessage = '';
            this.loadingService.dismissLoading();
          }
        );
      });
  };

  addAnotherRoomAction = () => {
    this.isCreated = false;
    this.roomDetails.roomName = '';
    this.roomDetails.roomCapacity = '';
    this.roomDetails.activeTenant = '';
    this.roomDetails.roomCost = '';
    this.roomDetails.electricBill = '';
    this.roomDetails.waterBill = '';
    this.fadeOuterrorMsg();
    this.errorMessage = '';
    this.fadeOutsuccessMsg();
    this.successMessage = '';
  };

  doneCreatingRoom = (dormitoryId: number) => {
    console.log('DORMITORY ID: ', dormitoryId);
    this.router.navigate([`/owner-tabs/dormitory-detail/${dormitoryId}`]);
    this.modalCtrl.dismiss();
  };
}
