import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  credentials = {
    plainPassword: '',
    plainConfirmPassword: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    const host = window.location.hostname;
    const port = window.location.port;
    console.log(host + ':' + port)
  }

  ngOnInit() {}

  changePassword() {
    this.route.paramMap.subscribe((params) => {
      console.log(params['params']);
      const id = params['params'].id;
      const role = params['params'].role;
      console.log(this.credentials)

      return this.userService.changePasswordRequest(this.credentials, id)
      .subscribe((response) => {
        console.log("Response: ", response);
        this.router.navigate(['dormRes/home'])
      })
    });
  }
}
