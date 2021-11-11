import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dormRes',
    pathMatch: 'full',
  },
  {
    path: 'dormRes',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'sign-in-as',
    loadChildren: () =>
      import('./pages/sign-in-as/sign-in-as.module').then(
        (m) => m.SignInAsPageModule
      ),
  },
  {
    path: 'sign-up-as',
    loadChildren: () =>
      import('./pages/sign-up-as/sign-up-as.module').then(
        (m) => m.SignUpAsPageModule
      ),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'change-password/:role/:id',
    loadChildren: () =>
      import('./pages/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'admin-login',
    loadChildren: () =>
      import('./pages/admin-login/admin-login.module').then(
        (m) => m.AdminLoginPageModule
      ),
  },
  {
    path: 'image',
    loadChildren: () =>
      import('./pages/image/image.module').then((m) => m.ImagePageModule),
  },
  {
    path: 'administrator',
    loadChildren: () =>
      import('./pages/administrator/administrator.module').then(
        (m) => m.AdministratorPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'owner-tabs',
    loadChildren: () =>
      import('./pages/owner-tabs/owner-tabs.module').then(
        (m) => m.OwnerTabsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'tenant-tabs',
    loadChildren: () =>
      import('./pages/tenant-tabs/tenant-tabs.module').then(
        (m) => m.TenantTabsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'resolver',
    loadChildren: () => import('./pages/resolver/resolver.module').then( m => m.ResolverPageModule)
  },
  {
    path: 'dormitory-detail-resolve/:dormitoryId',
    loadChildren: () => import('./pages/dormitory-detail-resolver/dormitory-detail-resolver.module').then( m => m.DormitoryDetailResolverPageModule)
  },
  {
    path: 'let-us-help',
    loadChildren: () => import('./pages/let-us-help/instructions.module').then( m => m.InstructionsPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
