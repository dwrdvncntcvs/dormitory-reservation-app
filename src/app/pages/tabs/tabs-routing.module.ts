import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
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
        path: 'account',
        loadChildren: () =>
          import('../../pages/account/account.module').then(
            (m) => m.AccountPageModule
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
    path: 'search',
    loadChildren: () =>
      import('../../pages/search/search.module').then(
        (m) => m.SearchPageModule
      ),
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
export class TabsPageRoutingModule {}
