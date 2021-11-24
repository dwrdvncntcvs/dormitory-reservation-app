import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {
  isTenantToggle: boolean = true;
  isOwnerToggle: boolean = false;

  constructor() {}

  ngOnInit() {}

  segmentChange(event) {}

  goBack = () => {
    window.history.back();
  };

  changeOwnerToggle = () => {
    this.isOwnerToggle = true;
    this.isTenantToggle = false;
  };

  changeTenantToggle = () => {
    this.isTenantToggle = true;
    this.isOwnerToggle = false;
  };
}
