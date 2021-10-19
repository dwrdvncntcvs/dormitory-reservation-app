import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  role = 'owner';
  dormitoryId: number;

  manageButtons = [
    {
      name: 'Room',
      icon: 'bed-outline',
      toDo: () => {},
    },
    {
      name: 'Document',
      icon: 'document-text-outline',
      toDo: () => {},
    },
    {
      name: 'Images',
      icon: 'images-outline',
      toDo: () => {},
    },
    {
      name: 'Location',
      icon: 'location-outline',
      toDo: () => {},
    },
    {
      name: 'Landmark',
      icon: 'location-outline',
      toDo: () => {},
    },
    {
      name: 'Dormitory Image',
      icon: 'image-outline',
      toDo: () => {},
    },
    {
      name: 'Amenities',
      icon: 'settings-outline',
      toDo: () => {},
    },
  ];

  constructor(
    private helperService: HelperService,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.helperService.checkRole(this.role, this.authGuard.userRole);
  }

  ionViewDidEnter = () => {
    this.getParamsValue();
  };

  getParamsValue = () => {
    this.route.queryParams.subscribe((passed_value) => {
      const dormitoryId = parseInt(passed_value.dormitoryId);
      console.log('DORMITORY ID: ', dormitoryId);
      this.dormitoryId = dormitoryId;
    });
  };

  goBackToDetailPage = (dormitoryId: number) => {
    this.router.navigate([`/owner-tabs/dormitory-detail/${dormitoryId}`]);
  }
}