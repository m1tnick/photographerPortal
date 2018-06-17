import { Component, OnInit } from '@angular/core';
import { AlbunsRestService } from '../../../shared/albuns-rest.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-list-albuns',
  templateUrl: './list-albuns.component.html',
  styleUrls: ['./list-albuns.component.css']
})
export class ListAlbunsComponent implements OnInit {
  imagefiles: Set<File> = new Set();
  constructor(private albunsRestService: AlbunsRestService) { }

  ngOnInit() {
  }

  getAlbumImages() {
    let imagefiles2: File[] = [];

    this.albunsRestService.getAlbumImage()
      .subscribe((data: any[]) => {
        data.forEach(function(element) {
          console.log(element.img.data.data);
          let file = new File(element.img.data.data);
          this.imagefiles2.add();
        });
      });
  }
}
