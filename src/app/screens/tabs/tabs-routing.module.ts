import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-screen',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home-screen',
        loadChildren: () => import('../../screens/home-screen/home-screen.module').then( m => m.HomeScreenPageModule)
      },
      {
        path: 'account-screen',
        loadChildren: () => import('../../screens/account-screen/account-screen.module').then( m => m.AccountScreenPageModule)
      },
      {
        path: 'apartment-screen',
        loadChildren: () => import('../../screens/apartment-screen/apartment-screen.module').then( m => m.ApartmentScreenPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
