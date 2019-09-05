import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogComponent } from './dialog/dialog.component';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {
    @Input() eventId: string;
    bsModalRef: BsModalRef;
    constructor(private modalService: BsModalService) {}

    public openUploadDialog() {
        const initialState = {
            eventId: this.eventId
        };
        this.bsModalRef = this.modalService.show(DialogComponent, {
            initialState
        });
        this.bsModalRef.content.closeBtnName = 'Close';
    }
}
