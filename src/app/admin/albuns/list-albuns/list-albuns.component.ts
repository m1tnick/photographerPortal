import { Component, OnInit } from '@angular/core';
import { AlbunsRestService } from '../../../shared/albuns-rest.service';
import { forEach } from '@angular/router/src/utils/collection';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-albuns',
  templateUrl: './list-albuns.component.html',
  styleUrls: ['./list-albuns.component.css']
})
export class ListAlbunsComponent implements OnInit {
  imagefiles: Set<File> = new Set();
  images = [];
  constructor(private albunsRestService: AlbunsRestService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

  getAlbumImages() {
    let imagefiles2: File[] = [];

    this.albunsRestService.getAlbumImage()
      .subscribe((data: any[]) => {
        
        data.forEach(function(element) {
          console.log(element.img.data.data);
          var arrayBufferView = new Uint8Array( element.img.data.data);          
            var blob = new Blob( [arrayBufferView ], { type: "image/jpeg" } );
            var urlCreator = window.URL || (window as any).webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl));
            // //this.image = (imageUrl);
            // var img = document.querySelector( "#photo" );
            // img.src = imageUrl;            







          // console.log(element.img.data.data);
          // var buffer = new ArrayBuffer(element.img.data.data.length);
          // buffer = element.img.data.data;


          // var blob = new Blob( [ element.img.data.data ], { type: "image/jpeg" } );
          // var urlCreator = window.URL || window.webkitURL;
          // var imageUrl = urlCreator.createObjectURL( blob );
          //var img = document.querySelector( "#photo" );
         // img.src = imageUrl;          
         // console.log(imageUrl);
          //let file = new File(element.img.data.data);
          //this.imagefiles2.add();
        }, this);
      });
  }
}
