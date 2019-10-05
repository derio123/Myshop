import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'dashboard', loadChildren: './Views/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './Views/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'details/:id', loadChildren: './Views/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'details', loadChildren: './Views/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
