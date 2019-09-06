import { EventService } from '@/shared/event.service';
import { Component, OnInit } from '@angular/core';

import Event, { IEvent } from '../../models/event.model';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {
    events: Event[];

    constructor(private eventService: EventService) {}

    ngOnInit() {
        this.eventService
            .getEvents()
            .subscribe((response: { count: number; data: IEvent[] }) => {
                this.events = response.data;
            });
    }

    deleteEvent(id) {
        this.eventService.deleteEvent(id).subscribe(res => {
            console.log('Deleted');
        });
    }
}
