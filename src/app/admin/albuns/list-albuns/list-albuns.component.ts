import { Component, OnInit } from '@angular/core';
import { AlbunsRestService } from '../../../shared/albuns-rest.service';
import { forEach } from '@angular/router/src/utils/collection';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../../models/album';

@Component({
  selector: 'app-list-albuns',
  templateUrl: './list-albuns.component.html',
  styleUrls: ['./list-albuns.component.css']
})
export class ListAlbunsComponent implements OnInit {
  imagefiles: Set<File> = new Set();
  images = [];
  albuns: Album[];

  constructor(private route: ActivatedRoute, private albunsRestService: AlbunsRestService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.route.data.subscribe((
      (data) => { this.albuns = data.albuns; }
    ));
  }

  getAlbumImage(imageName: string) {
    console.log("Sending request for " + imageName);
    this.albunsRestService.getAlbumImage(imageName)
      .subscribe((data: any) => {
        console.log("Received something");
        console.log(data);
        });
      }  

  getAlbumImages() {
    let imagefiles2: File[] = [];

    this.albunsRestService.getAlbumImages()
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
