import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ManageAlbunsComponent } from './manage-albuns/manage-albuns.component';
import { ListAlbunsComponent } from './list-albuns/list-albuns.component';
import { AdminAlbunsRoutingModule } from './albuns-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AdminAlbunsRoutingModule
  ],
  declarations: [CreateAlbumComponent, ManageAlbunsComponent, ListAlbunsComponent]
})
export class AlbunsModule { }
