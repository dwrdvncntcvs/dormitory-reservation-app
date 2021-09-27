import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from './services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: Storage,
    private userService: UserService,
    private router: Router
  ) {
    this.storage.create();
    this.checkUserRole();
  }

  checkUserRole = async () => {
    const token = await this.userService.loadStoredToken();

    const decoded_token = helper.decodeToken(token);
    console.log(decoded_token);
    if (decoded_token.role === 'owner') {
      const url = 'owner-tabs';
      this.router.navigateByUrl(url);
    }
  };
}
