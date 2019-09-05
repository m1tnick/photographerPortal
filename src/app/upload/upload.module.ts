import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { DialogComponent } from './dialog/dialog.component';
import { UploadComponent } from './upload.component';
import { UploadService } from './upload.service';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule,
      ModalModule.forRoot(),
      ProgressbarModule.forRoot()
    ],
    declarations: [UploadComponent, DialogComponent],
    entryComponents: [DialogComponent],
    exports: [UploadComponent],
    providers: [UploadService]
  })
  export class UploadModule {}
