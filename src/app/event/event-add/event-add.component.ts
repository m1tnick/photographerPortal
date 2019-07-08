import { EventService } from '@/shared/event.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html'
})
export class EventAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      date: ['', Validators.required ],
      type: ['', Validators.required ]
    });
  }

  submit(name, date, type) {
    this.eventService.create(name, date, type);
  }


  ngOnInit() {
  }

}
