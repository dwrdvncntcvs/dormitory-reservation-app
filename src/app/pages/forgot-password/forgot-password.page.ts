import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  isEmailSent: boolean = false;

  credentials = {
    email: '',
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform,
  ) { }

  ngOnInit() {
  }

  checkEmailAction() {
    const currentPlatform = this.platform.is("android");
    this.userService.checkEmailRequest(this.credentials)
    .subscribe(data => {
      const userId = data['userId'];
      const userRole = data['userRole'];
      if (currentPlatform === true) {
        this.router.navigate([`change-password/$${userRole}/${userId}`])
      }
      this.isEmailSent = true;
    })
  }

  goBackAction() {
    this.router.navigate(['dormRes/home'])
  }

}
