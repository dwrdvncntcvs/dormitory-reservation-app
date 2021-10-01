import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'admin-home',
        loadChildren: () =>
          import('../../pages/admin-home/admin-home.module').then(
            (m) => m.AdminHomePageModule
          ),
      },
      {
        path: 'owner/isVerified/:isVerified',
        loadChildren: () =>
          import('../../pages/owner/owner.module').then(
            (m) => m.OwnerPageModule
          ),
      },
      {
        path: 'tenant/isVerified/:isVerified',
        loadChildren: () =>
          import('../../pages/tenant/tenant.module').then(
            (m) => m.TenantPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
