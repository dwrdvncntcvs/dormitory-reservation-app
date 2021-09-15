import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'dormitories',
        loadChildren: () => import('../../pages/dormitories/dormitories.module').then( m => m.DormitoriesPageModule),
        canActivate: [AuthGuard] //Sample
      },
      {
        path: 'account',
        loadChildren: () => import('../../pages/account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('../../pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
