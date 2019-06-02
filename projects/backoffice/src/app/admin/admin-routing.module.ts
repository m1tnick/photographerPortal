import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AdminComponent } from './admin/admin.component';

const adminRoutes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      // {
      //   path: '/admin',
      // },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'albuns', loadChildren: './albuns/albuns.module#AlbunsModule' }
    ]
  },

];

@NgModule({
  providers: [
  ],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

