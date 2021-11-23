import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.page.html',
  styleUrls: ['./create-admin.page.scss'],
})
export class CreateAdminPage implements OnInit {
  goToPage: string = 'administrator/users/admin/isVerified/true';

  credentials = {
    name: '',
    username: '',
    email: '',
    plainPassword: '',
    plainConfirmPassword: '',
    contactNumber: '',
    address: '',
    gender: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit = () => {};

  ionViewWillLeave = () => {
    this.credentials.name = '';
    this.credentials.username = '';
    this.credentials.email = '';
    this.credentials.plainPassword = '';
    this.credentials.plainConfirmPassword = '';
    this.credentials.contactNumber = '';
    this.credentials.address = '';
    this.credentials.gender = '';
  };

  createAdminUser = (role) => {
    this.userService.signUpRequest(this.credentials, role).then((response) => {
      response.subscribe((responseData) => {
        const msg = responseData['msg'];
        const userId = responseData['userId'];
        this.userService.verifyUserEmailrequest(userId).then((response) => {
          response.subscribe((responseData) => responseData);
        });
        this.userService.verifyUserAccountRequest(userId).then((response) => {
          response.subscribe((responseData) => responseData);
        });
        this.router.navigate([this.goToPage]);
      });
    });
  };
}
