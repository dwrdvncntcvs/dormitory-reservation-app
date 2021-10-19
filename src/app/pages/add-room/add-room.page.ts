import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { DormitoriesService } from 'src/app/services/dormitories.service';

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
    roomCapacity: '',
    roomCost: '',
    electricBill: '',
    waterBill: '',
  };

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
    private dormitoriesService: DormitoriesService
  ) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getParamsValue();
  };

  closeModal = () => {
    this.modalCtrl.dismiss();
  };

  getParamsValue = () => {
    const paramsValue = this.navParams.get('dormitoryId');
    this.dormitoryId = paramsValue;
  };

  createRoomAction = (dormitoryId: number) => {
    console.log('Room Details: ', this.roomDetails);
    console.log('Dormitory ID: ', dormitoryId);
    this.dormitoriesService
      .createRoomRequest(this.roomDetails, dormitoryId)
      .then((response) => {
        response.subscribe(
          (responseData) => {
            console.log('Response Data: ', responseData);
            this.successMessage = 'Room Successfully Created.';
            this.errorMessage = '';
            this.isCreated = true;
          },
          (err) => {
            console.log(err);
            this.errorMessage = err['error'].msg;
            this.successMessage = '';
          }
        );
      });
  };

  addAnotherRoomAction = () => {
    this.isCreated = false;
    this.roomDetails.roomName = '';
    (this.roomDetails.roomCapacity = ''),
      (this.roomDetails.roomCost = ''),
      (this.roomDetails.electricBill = ''),
      (this.roomDetails.waterBill = '');
      this.errorMessage = '';
      this.successMessage = '';
  };

  doneCreatingRoom = (dormitoryId: number) => {
    console.log('DORMITORY ID: ', dormitoryId);
    this.router.navigate([`/owner-tabs/dormitory-detail/${dormitoryId}`]);
    this.modalCtrl.dismiss();
  };
}
