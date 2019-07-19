import { Component, OnInit } from '@angular/core';
import Event from '../../models/event.model';
import { EventService } from '@/shared/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService
      .getEvents()
      .subscribe((data: Event[]) => {
        this.events = data;
    });
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
