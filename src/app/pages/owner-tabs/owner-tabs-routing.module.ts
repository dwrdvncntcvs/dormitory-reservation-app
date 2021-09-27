import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerTabsPage } from './owner-tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dormitory-list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: OwnerTabsPage,
    children: [
      {
        path: 'dormitory-list',
        loadChildren: () =>
          import('../../pages/dormitory-list/dormitory-list.module').then(
            (m) => m.DormitoryListPageModule
          ),
      },
      {
        path: 'create-dormitory',
        loadChildren: () =>
          import('../../pages/create-dormitory/create-dormitory.module').then(
            (m) => m.CreateDormitoryPageModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('../../pages/account/account.module').then(
            (m) => m.AccountPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
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
export class OwnerTabsPageRoutingModule {}
