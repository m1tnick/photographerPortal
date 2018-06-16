import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AlbunsModule } from './albuns/albuns.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AlbunsModule,
  ],
  declarations: [
    AdminComponent, 
    SidebarComponent
  ]
})
export class AdminModule { }
