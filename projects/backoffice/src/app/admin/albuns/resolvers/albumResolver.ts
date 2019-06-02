import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from '../../../models/album';
import { AlbunsService } from '../albuns.service';

@Injectable()
export class AlbumResolver implements Resolve<Album> {
  constructor(private albunsService: AlbunsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> {
    return this.albunsService.readAlbum(route.paramMap.get('id'));
  }
}
