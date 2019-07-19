import { EventAddComponent } from '@/event/event-add/event-add.component';
import { EventEditComponent } from '@/event/event-edit/event-edit.component';
import { EventListComponent } from '@/event/event-list/event-list.component';
import { EventRoutingModule } from '@/event/event-routing.module';
import { EventService } from '@/shared/event.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    EventAddComponent,
    EventListComponent,
    EventEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    EventRoutingModule,
    NgSelectModule
  ],
  providers: [
    EventService
  ]
})
export class EventModule { }
