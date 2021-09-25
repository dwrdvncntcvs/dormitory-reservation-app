import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DormitoriesService } from 'src/app/services/dormitories.service';

@Component({
  selector: 'app-create-dormitory',
  templateUrl: './create-dormitory.page.html',
  styleUrls: ['./create-dormitory.page.scss'],
})
export class CreateDormitoryPage implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;

  dormitoryForm = {
    name: '',
    address: '',
    contactNumber: '',
    allowedGender: '',
  };

  dormDocumentForm = {
    documentType: '',
  };

  @ViewChild('file', { static: false }) file: HTMLInputElement;
  constructor(
    private dormitoriesService: DormitoriesService,
    private router: Router
  ) {}

  ngOnInit() {}

  getImageFile = (files) => {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  };

  createDormitory(file) {
    const image = this.imagePath;
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
                    file.value = '';
                    this.imgURL = '';
                  },
                  (err) => {
                    console.log(err);
                    this.dormitoryForm.name = '';
                    this.dormitoryForm.address = '';
                    this.dormitoryForm.contactNumber = '';
                    this.dormitoryForm.allowedGender = '';
                    this.dormDocumentForm.documentType = '';
                    file.value = '';
                    this.imgURL = '';
                  }
                );
              });
          },
          (error) => {
            console.log('Error: ', error);
            this.dormitoryForm.name = '';
            this.dormitoryForm.address = '';
            this.dormitoryForm.contactNumber = '';
            this.dormitoryForm.allowedGender = '';
            this.dormDocumentForm.documentType = '';
            file.value = '';
            this.imgURL = '';
          }
        );
      });
  }
}
