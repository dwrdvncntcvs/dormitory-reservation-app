import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-resolver',
  templateUrl: './resolver.page.html',
  styleUrls: ['./resolver.page.scss'],
})
export class ResolverPage implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.checkToken();
  }

  checkToken = async () => {
    const token = await this.userService.loadStoredToken();
    if (token === null) {
      this.router.navigate(['dormRes/home']);
    } else {
      const decoded_token = helper.decodeToken(token);
      const userRole = decoded_token.role;
      this.routeUsingRole(userRole);
    }
  };

  routeUsingRole = (role: string) => {
    if (role === 'admin') {
      this.router.navigate(['administrator']);
    }
    if (role === 'owner') {
      this.router.navigate(['owner-tabs']);
    }
    if (role === 'tenant') {
      this.router.navigate(['tenant-tabs']);
    }
  };
}
