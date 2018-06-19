import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ListAlbunsComponent } from './albuns/list-albuns/list-albuns.component';
import { ManageAlbunsComponent } from './albuns/manage-albuns/manage-albuns.component';
import { CreateAlbumComponent } from './albuns/create-album/create-album.component';
import { ListAlbumResolver } from './albuns/resolvers/listAlbumResolver';


const adminRoutes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'albuns', component: ListAlbunsComponent, resolve: {albuns: ListAlbumResolver} },
    { path: 'albuns/manage', component: ManageAlbunsComponent },
    { path: 'albuns/create', component: CreateAlbumComponent }
  ] },
];

@NgModule({
  providers: [
    ListAlbumResolver
  ],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

