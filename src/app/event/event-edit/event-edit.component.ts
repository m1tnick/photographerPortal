import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '@/shared/event.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  business: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder) {
      this.createForm();
 }

  createForm() {
    this.angForm = this.fb.group({
        name: ['', Validators.required ],
        date: ['', Validators.required ],
        type: ['', Validators.required ]
      });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventService.editEvent(params['id']).subscribe(res => {
        this.business = res;
      });
    });
  }

  updateEvent(name, date, type) {
    this.route.params.subscribe(params => {
       this.eventService.updateEvent(name, date, type, params['id']);
       this.router.navigate(['event']);
    });
  }
}
