import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DormitoriesService } from 'src/app/services/dormitories.service';

@Component({
  selector: 'app-create-dormitory',
  templateUrl: './create-dormitory.page.html',
  styleUrls: ['./create-dormitory.page.scss'],
})
export class CreateDormitoryPage implements OnInit {
  image = {};

  dormitoryForm = {
    name: '',
    address: '',
    contactNumber: '',
    allowedGender: '',
  };

  dormDocumentForm = {
    documentType: '',
  };

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {}

  ngOnInit() {}

  getImageFile = (event) => {
    const eventObj = event as ElementRef;
    const file = eventObj;
    const imageFile = file['srcElement'].files[0];

    this.image = imageFile;
  };

  createDormitory() {
    const image = this.image;
    console.log(image);
    console.log(this.dormitoryForm);
    this.dormitoriesService
      .createDormitoryRequest(this.dormitoryForm)
      .then((response) => {
        response.subscribe(
          (data) => {
            console.log('Data: ', data);
            this.dormitoriesService
              .createDormDocumentRequest(
                image,
                this.dormDocumentForm,
                data['dormitory']
              )
              .then((response) => {
                response.subscribe(
                  (dormDocument) => {
                    console.log(dormDocument);
                    this.router.navigate(['owner-tabs/dormitory-list']);
                    this.dormitoryForm.name = '';
                    this.dormitoryForm.address = '';
                    this.dormitoryForm.contactNumber = '';
                    this.dormitoryForm.allowedGender = '';
                    this.dormDocumentForm.documentType = '';
                    this.fileInput = null;
                  },
                  (err) => console.log(err)
                );
              });
          },
          (error) => {
            console.log('Error: ', error);
          }
        );
      });
  }
}
