import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {
  fileToUpload: File = null;
  
  constructor() { }

  ngOnInit() {
    console.log("HELLLLLO");
  }
  
  handleFileInput(files: FileList) {
    console.log("HELLO"  + files);
    this.fileToUpload = files.item(0);
    this.postFile(this.fileToUpload);
  }
  
postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'https://m1tnick-m1tnick.c9users.io/albuns';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: yourHeadersConfig })
      .map(() => { return true; })
      .catch((e) => this.handleError(e));
  }  

}
