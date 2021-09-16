import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dormitories',
  templateUrl: './dormitories.page.html',
  styleUrls: ['./dormitories.page.scss'],
})
export class DormitoriesPage implements OnInit {
  dorm_list = [1,1,1,1,1,1];

  toggle: Boolean = false;

  constructor() {}

  ngOnInit() {}

  onToggle() {
    this.toggle = !this.toggle;
  }
}
