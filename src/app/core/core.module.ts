import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { AlbunsRestService } from '../shared/albuns-rest.service';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
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
    AlbunsRestService
  ]
})
export class CoreModule { }
