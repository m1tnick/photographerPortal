import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
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

