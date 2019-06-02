import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    console.log('init');

      this.subscription = this.alertService.getMessage().subscribe(message => {
        console.log(11111);

          this.message = message;
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
