import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from '@/event/event-list/event-list.component';
import { EventAddComponent } from '@/event/event-add/event-add.component';

const eventRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: EventListComponent },
      { path: 'create', component: EventAddComponent }
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
