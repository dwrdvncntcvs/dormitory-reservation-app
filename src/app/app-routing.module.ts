import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dormRes',
    pathMatch: 'full'
  },
  {
    path: 'dormRes',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'sign-in-as',
    loadChildren: () => import('./pages/sign-in-as/sign-in-as.module').then( m => m.SignInAsPageModule)
  },
  {
    path: 'sign-up-as',
    loadChildren: () => import('./pages/sign-up-as/sign-up-as.module').then( m => m.SignUpAsPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'owner-tabs',
    loadChildren: () => import('./pages/owner-tabs/owner-tabs.module').then( m => m.OwnerTabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tenant-tabs',
    loadChildren: () => import('./pages/tenant-tabs/tenant-tabs.module').then( m => m.TenantTabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password/:role/:id',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
