import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ManageAlbunsComponent } from './manage-albuns/manage-albuns.component';
import { ListAlbunsComponent } from './list-albuns/list-albuns.component';
import { AdminAlbunsRoutingModule } from './albuns-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FileSelectDirective } from 'ng2-file-upload';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminAlbunsRoutingModule
  ],
  declarations: [CreateAlbumComponent, ManageAlbunsComponent, ListAlbunsComponent, FileSelectDirective]
})
export class AlbunsModule { }
