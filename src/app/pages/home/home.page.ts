import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dorm_list = [1, 1, 1, 1];
  constructor(
    private storage: Storage,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.loadStoredToken(); //Sample\
  }

  ngOnInit() {}

}
