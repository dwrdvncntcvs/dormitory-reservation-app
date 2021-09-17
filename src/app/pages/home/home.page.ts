import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private storage: Storage, private userService: UserService) {
    this.userService.loadStoredToken(); //Sample
  }

  ngOnInit() {}


  dorm_list = [1,1,1,1]

}
