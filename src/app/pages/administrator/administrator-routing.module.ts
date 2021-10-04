import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorPage } from './administrator.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdministratorPage,
    children: [
      {
        path: 'admin-home',
        loadChildren: () =>
          import('../../pages/admin-home/admin-home.module').then(
            (m) => m.AdminHomePageModule
          ),
      },

      {
        path: 'dormitories/:gender/isVerified/:isVerified',
        loadChildren: () =>
          import(
            '../../pages/dormitory-list-admin/dormitory-list-admin.module'
          ).then((m) => m.DormitoryListAdminPageModule),
      },
      {
        path: 'users/:role/isVerified/:isVerified',
        loadChildren: () =>
          import('../../pages/users/users.module').then(
            (m) => m.UsersPageModule
          ),
      },
      {
        path: 'user-details/:role/:userId',
        loadChildren: () =>
          import('../../pages/user-details/user-details.module').then(
            (m) => m.UserDetailsPageModule
          ),
      },

      {
        path: 'dormitory-detail-admin/dormitory/:dormitoryId',
        loadChildren: () =>
          import(
            '../../pages/dormitory-detail-admin/dormitory-detail-admin.module'
          ).then((m) => m.DormitoryDetailAdminPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorPageRoutingModule {}
