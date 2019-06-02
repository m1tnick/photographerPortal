import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

import { SharedModule } from '../../../../../../src/app/shared/shared.module';
import { AlbumComponent } from './album.component';
import { AdminAlbunsRoutingModule } from './albuns-routing.module';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ListAlbunsComponent } from './list-albuns/list-albuns.component';
import { ManageAlbunsComponent } from './manage-albuns/manage-albuns.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AdminAlbunsRoutingModule
  ],
  declarations: [AlbumComponent, CreateAlbumComponent, ManageAlbunsComponent, ListAlbunsComponent, FileSelectDirective]
})
export class AlbunsModule { }
