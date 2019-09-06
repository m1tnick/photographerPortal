import EventModel from '@/models/event.model';
import { EventService } from '@/shared/event.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-event-edit',
    templateUrl: './event-edit.component.html',
    styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
    eventData = new EventModel();
    angForm: FormGroup;
    filesToUpload: Array<File> = [];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private eventService: EventService,
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    createForm() {
        this.angForm = this.fb.group({
            name: ['', Validators.required],
            date: ['', Validators.required],
            type: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.eventService.editEvent(params['id']).subscribe(res => {
                this.eventData = res;
            });
        });
    }

    updateEvent(name, date, type) {
        this.route.params.subscribe(params => {
            this.eventService.updateEvent(name, date, type, params['id']);
            this.router.navigate(['event']);
        });
    }

    removeImage(i: number, itemId: string) {
        this.eventService.deleteImage(this.eventData._id, itemId)
            .subscribe(
                data => {
                    console.log(data);
                    this.eventData.images.splice(i, 1);
                },
                error => console.info(error)
            );
    }
}
