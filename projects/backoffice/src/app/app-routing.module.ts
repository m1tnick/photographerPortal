import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}