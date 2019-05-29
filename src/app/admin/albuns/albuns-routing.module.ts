import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumComponent } from './album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ListAlbunsComponent } from './list-albuns/list-albuns.component';
import { ManageAlbunsComponent } from './manage-albuns/manage-albuns.component';
import { AlbumResolver } from './resolvers/albumResolver';
import { ListAlbumResolver } from './resolvers/listAlbumResolver';


const adminAlbunsRoutes: Routes = [
  {
    path: '', component: AlbumComponent, children: [
      { path: '', component: ListAlbunsComponent, resolve: { albuns: ListAlbumResolver } },
      { path: 'new', component: CreateAlbumComponent },
      { path: ':id', component: ManageAlbunsComponent, resolve: { albuns: AlbumResolver } }
    ]
  },
];

@NgModule({
  providers: [
    ListAlbumResolver,
    AlbumResolver
  ],
  imports: [
    RouterModule.forChild(adminAlbunsRoutes)
  ],
  exports: [RouterModule]
})
export class AdminAlbunsRoutingModule { }

