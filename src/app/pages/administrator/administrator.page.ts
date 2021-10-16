import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.page.html',
  styleUrls: ['./administrator.page.scss'],
})
export class AdministratorPage implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.checkUserRole();
  }

  ngOnInit() {
  }

  checkUserRole = async () => {
    const token = await this.userService.loadStoredToken();

    const decoded_token = helper.decodeToken(token);
    console.log(decoded_token);
    if (decoded_token.role === 'owner') {
      const url = '/owner-tabs';
      this.router.navigateByUrl(url);
    } else if (decoded_token.role === 'admin') {
      this.router.navigateByUrl('/administrator')
    }
  };
}
