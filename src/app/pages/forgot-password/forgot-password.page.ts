import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  credentials = {
    email: '',
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  checkEmailAction() {
    return this.userService.checkEmailRequest(this.credentials)
    .subscribe(data => {
      console.log(data);
    })
  }

  goBackAction() {
    this.router.navigate(['dormRes/home'])
  }

}
