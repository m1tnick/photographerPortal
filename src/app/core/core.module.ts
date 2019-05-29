import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlbunsService } from '../admin/albuns/albuns.service';
import { AppRoutingModule } from '../app-routing.module';
import { AlbunsRestService } from '../shared/albuns-rest.service';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    CommonModule
  ],
  exports: [
    AppRoutingModule,
    HomeComponent,
    HeaderComponent
  ],
  providers: [
    AlbunsRestService,
    AlbunsService
  ]
})
export class CoreModule { }
