import { EventService } from '@/shared/event.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventType } from '@/enum/eventType';

@Component({
    selector: 'app-event-add',
    templateUrl: './event-add.component.html'
})
export class EventAddComponent {

    angForm: FormGroup;

    constructor(private fb: FormBuilder, private eventService: EventService) {
        this.createForm();
    }

    submit() {
        const { name, date, type } = this.angForm.controls;

        this.eventService.create(name.value, date.value, type.value);
    }

    getEventTypes(): any[] {
        const myEnum = [];
        const objectEnum = Object.keys(EventType);
        const values = objectEnum.slice(0, objectEnum.length / 2);
        const keys = objectEnum.slice(objectEnum.length / 2);

        for (let i = 0; i < objectEnum.length / 2; i++) {
            myEnum.push({ key: keys[i], value: values[i] });
        }

        return myEnum;
    }

    private createForm() {
        this.angForm = this.fb.group({
            name: ['', Validators.required],
            date: ['', Validators.required],
            type: ['', Validators.required]
        });
    }
}
