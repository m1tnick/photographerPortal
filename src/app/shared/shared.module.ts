import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from 'ngx-bootstrap';
import { AlbunsRestService } from './albuns-rest.service';



@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  declarations: [],
  exports: []
})
export class SharedModule { }
