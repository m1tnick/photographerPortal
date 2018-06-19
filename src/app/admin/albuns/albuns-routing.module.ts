import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ManageAlbunsComponent } from './manage-albuns/manage-albuns.component';
import { ListAlbunsComponent } from './list-albuns/list-albuns.component';
import { ListAlbumResolver } from './resolvers/listAlbumResolver';


const adminAlbunsRoutes: Routes = [
  { path: '', component: ListAlbunsComponent, resolve: {albuns: ListAlbumResolver}, children: [
    { path: 'manage', component: ManageAlbunsComponent },
    { path: 'create', component: CreateAlbumComponent }
  ] },
];

@NgModule({
  providers:[
    ListAlbumResolver
  ],
  imports: [
    RouterModule.forChild(adminAlbunsRoutes)
  ],
  exports: [RouterModule]
})
export class AdminAlbunsRoutingModule {}

