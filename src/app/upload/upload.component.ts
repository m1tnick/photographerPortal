import { Component, Input, ViewChild } from '@angular/core';

import { UploadService } from './upload.service';
import { forkJoin, Observable } from 'rxjs';

/*
    Ideias for this component:
        - Click open fullscreen 'window'
        - Drag n Drop area
        - Progress bar
*/

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {
    @ViewChild('file') file;
    @Input() eventId: string;

    public files: Set<File> = new Set();
    progress: {
        [key: string]: {
            progress: Observable<number>;
        };
    };

    uploading = false;
    uploadSuccessful = false;

    constructor(public uploadService: UploadService) {}

    addFiles() {
        this.file.nativeElement.click();
    }

    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        for (const key in files) {
            if (!isNaN(parseInt(key, 10))) {
                this.files.add(files[key]);
            }
        }
    }

    upload() {
        // if everything was uploaded already, just close the dialog
        if (this.uploadSuccessful) {
            return;
        }

        // set the component state to "uploading"
        this.uploading = true;

        // start the upload and save the progress map
        this.progress = this.uploadService.upload(this.eventId, this.files);

        // convert the progress map into an array
        const allProgressObservables = [];
        for (const key in this.progress) {
            if (this.progress[key]) {
                allProgressObservables.push(this.progress[key].progress);
            }
        }

        // Adjust the state variables

        // When all progress-observables are completed...
        forkJoin(allProgressObservables).subscribe(end => {
            // ... the dialog can be closed again...
            // this.canBeClosed = true;

            // ... the upload was successful...
            this.uploadSuccessful = true;

            // ... and the component is no longer uploading
            this.uploading = false;
        });
    }
}
