import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from '@/event/event-list/event-list.component';
import { EventAddComponent } from '@/event/event-add/event-add.component';
import { EventEditComponent } from '@/event/event-edit/event-edit.component';

const eventRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: EventListComponent },
      { path: 'create', component: EventAddComponent },
      { path: 'edit/:id', component: EventEditComponent }
    ]
  }
];

@NgModule({
  providers: [
  ],
  imports: [
    RouterModule.forChild(eventRoutes)
  ],
  exports: [RouterModule]
})
export class EventRoutingModule { }
