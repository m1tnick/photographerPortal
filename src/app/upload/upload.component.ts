import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { UploadService, FileQueueObject } from './upload.service';

/*
    Ideias for this component:
        - Click open fullscreen 'window'
        - Drag n Drop area
*/

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {
    @ViewChild('file') file;
    @Input() eventId: string;

    public files: Set<File> = new Set();
    progress: Observable<any>;
    queue: Observable<FileQueueObject[]>;

    uploading = false;
    uploadSuccessful = false;

    constructor(public uploadService: UploadService) {}

    ngOnInit() {
        this.queue = this.uploadService.queue;
    }

    addFiles() {
        this.file.nativeElement.click();
    }

    addToQueue() {
        const fileBrowser = this.file.nativeElement;
        this.uploadService.addToQueue(fileBrowser.files);
    }

// https://www.truecodex.com/course/angular-6/file-upload-in-angular-6-7-with-progress-bar-using-web-api
// https://www.techiediaries.com/angular-file-upload-progress-bar/
    upload() {
        this.uploadService.uploadAll(this.eventId);
    }
}
