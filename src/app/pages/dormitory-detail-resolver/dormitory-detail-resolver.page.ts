import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dormitory-detail-resolver',
  templateUrl: './dormitory-detail-resolver.page.html',
  styleUrls: ['./dormitory-detail-resolver.page.scss'],
})
export class DormitoryDetailResolverPage implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getParams();
  }

  getParams = () => {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      const dormitoryId = params['params'].dormitoryId;
      this.router.navigate([`owner-tabs/dormitory-detail/${dormitoryId}`]);
    });
  };
}
