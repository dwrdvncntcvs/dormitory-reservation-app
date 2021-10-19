import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

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
  {
    path: 'manage',
    loadChildren: () =>
      import('../../pages/manage/manage.module').then(
        (m) => m.ManagePageModule
      ),
  },
  {
    path: 'add-room/dormitory/:id',
    loadChildren: () =>
      import('../../pages/add-room/add-room.module').then(
        (m) => m.AddRoomPageModule
      ),
  },
  {
    path: 'add-document/dormitory/:id',
    loadChildren: () =>
      import('../../pages/add-document/add-document.module').then(
        (m) => m.AddDocumentPageModule
      ),
  },

  {
    path: 'add-amenity/dormitory/:id',
    loadChildren: () =>
      import('../../pages/add-amenity/add-amenity.module').then(
        (m) => m.AddAmenityPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerTabsPageRoutingModule {}
