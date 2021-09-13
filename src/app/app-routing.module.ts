import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
