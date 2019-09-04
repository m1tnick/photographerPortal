import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '@/shared/event.service';
import { HttpClient } from '@angular/common/http';
import EventModel from '@/models/event.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-event-edit',
    templateUrl: './event-edit.component.html',
    styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
    business = new EventModel();
    angForm: FormGroup;
    filesToUpload: Array<File> = [];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private eventService: EventService,
        private fb: FormBuilder,
        private http: HttpClient
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

    upload() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        console.log(files);

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i], files[i]['name']);
        }
        console.log('form data variable :   ' + formData.toString());
        this.eventService.upload(this.business._id, formData)
            .subscribe(
                response => console.log('files', response),
                error => console.log('error: ', error)
            );
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }
}
