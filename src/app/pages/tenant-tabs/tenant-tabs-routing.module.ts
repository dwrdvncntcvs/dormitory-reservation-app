import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenantTabsPage } from './tenant-tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TenantTabsPage,
    children: [
      {
        path: 'search',
        loadChildren: () => import('../../pages/search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'reservations',
        loadChildren: () => import('../../pages/reservations/reservations.module').then( m => m.ReservationsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantTabsPageRoutingModule {}
