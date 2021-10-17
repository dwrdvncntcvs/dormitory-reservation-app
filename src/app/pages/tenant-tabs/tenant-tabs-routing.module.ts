import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenantTabsPage } from './tenant-tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TenantTabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'dormitories',
        loadChildren: () =>
          import('../../pages/dormitories/dormitories.module').then(
            (m) => m.DormitoriesPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('../../pages/about-us/about-us.module').then(
            (m) => m.AboutUsPageModule
          ),
      },
    ],
  },
  {
    path: 'dormitory-detail/:id',
    loadChildren: () =>
      import('../../pages/dormitory-detail/dormitory-detail.module').then(
        (m) => m.DormitoryDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantTabsPageRoutingModule {}
