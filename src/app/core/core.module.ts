import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AlbunsRestService } from '../shared/albuns-rest.service';
import { AlbunsService } from '../admin/albuns/albuns.service';



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
export class CoreModule {}