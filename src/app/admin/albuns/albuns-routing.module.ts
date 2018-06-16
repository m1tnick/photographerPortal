import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ManageAlbunsComponent } from './manage-albuns/manage-albuns.component';
import { ListAlbunsComponent } from './list-albuns/list-albuns.component';


const adminAlbunsRoutes: Routes = [
  { path: '', component: ListAlbunsComponent, children: [
    { path: 'manage', component: ManageAlbunsComponent },
    { path: 'create', component: CreateAlbumComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminAlbunsRoutes)
  ],
  exports: [RouterModule]
})
export class AdminAlbunsRoutingModule {}

