import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { UploadComponent } from './upload.component';
import { UploadService } from './upload.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ModalModule.forRoot(),
        ProgressbarModule.forRoot()
    ],
    declarations: [UploadComponent],
    exports: [UploadComponent],
    providers: [UploadService]
})
export class UploadModule {}
