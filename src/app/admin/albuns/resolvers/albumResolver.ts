import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Album } from "../../../models/album";
import { AlbunsService } from "../albuns.service";
import { Observable } from "rxjs";

@Injectable()
export class AlbumResolver implements Resolve<Album> {
    constructor(private albunsService: AlbunsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> {
        return this.albunsService.readAlbum(route.paramMap.get('id'));
    }
}