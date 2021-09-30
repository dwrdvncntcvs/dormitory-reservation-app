import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { api } from 'src/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
