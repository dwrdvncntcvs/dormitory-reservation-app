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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorPageRoutingModule {}
