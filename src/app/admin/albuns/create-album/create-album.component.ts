import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Album } from '../../../models/album';
import { AlbunsService } from '../albuns.service';

const URL = 'https://m1tnick-m1tnick.c9users.io/albuns';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})

export class CreateAlbumComponent implements OnInit {

  constructor(private albunsService: AlbunsService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const album = new Album(value.name, value.description);
    this.albunsService.createAlbum(album).subscribe(
      resp => console.log(resp)
    );
  }

}

// export class CreateAlbumComponent implements OnInit {
//   fileToUpload: File = null;
//   progress;
//   canBeClosed = true;
//   primaryButtonText = 'Upload';
//   showCancelButton = true;
//   uploading = false;
//   uploadSuccessful = false;

//   @ViewChild('file') file;
//   public files: Set<File> = new Set();

//   addFiles() {
//     this.file.nativeElement.click();
//   }

//   onFilesAdded() {
//     const files: { [key: string]: File } = this.file.nativeElement.files;
//     for (let key in files) {
//       if (!isNaN(parseInt(key))) {
//         this.files.add(files[key]);
//       }
//     }
//     this.closeDialog();
//   }

//   closeDialog() {

//     // set the component state to "uploading"
//     this.uploading = true;

//     // start the upload and save the progress map
//     this.progress = this.albunsRestService.upload(this.files);

//     // convert the progress map into an array
//     let allProgressObservables = [];
//     for (let key in this.progress) {
//       allProgressObservables.push(this.progress[key].progress);
//     }

//     // Adjust the state variables

//     // The OK-button should have the text "Finish" now
//     this.primaryButtonText = 'Finish';

//     // The dialog should not be closed while uploading
//     this.canBeClosed = false;

//     // Hide the cancel-button
//     this.showCancelButton = false;

//     // When all progress-observables are completed...
//     forkJoin(allProgressObservables).subscribe(end => {
//       // ... the dialog can be closed again...
//       this.canBeClosed = true;

//       // ... the upload was successful...
//       this.uploadSuccessful = true;

//       // ... and the component is no longer uploading
//       this.uploading = false;
//     });
//   }


//   public uploader:FileUploader = new FileUploader({url: URL});


//   constructor(private albunsRestService: AlbunsRestService, private el: ElementRef) { }

//   ngOnInit() {
//     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
//       console.log("ImageUpload:uploaded:", item, status, response);
//   };
//   }

//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
//     this.postFile(this.fileToUpload);
//   }

//   postFile(fileToUpload: File) {
//     var formData: FormData = new FormData();
//     formData.append('fileKey', fileToUpload, fileToUpload.name);
//     console.log(formData);
//     this.albunsRestService.postFile(formData)
//     .subscribe((data) => console.log("LOL" + data));

//   }

//   upload() {
//     //locate the file element meant for the file upload.
//         let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
//     //get the total amount of files attached to the file input.
//         let fileCount: number = inputEl.files.length;
//     //create a new fromdata instance
//         let formData = new FormData();
//     //check if the filecount is greater than zero, to be sure a file was selected.
//         if (fileCount > 0) { // a file was selected
//             //append the key name 'photo' with the first file in the element
//                 formData.append('photo', inputEl.files.item(0));
//             //call the angular http method
//        }
//        console.log(formData)  ;
//        console.log(inputEl.files.item(0))  ;
//        this.albunsRestService.postFile(formData)
//        .subscribe((data) => console.log("LOL" + data));
//       }

// }
