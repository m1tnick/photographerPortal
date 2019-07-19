import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      // this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      // this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      // this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      // this._loadingBar.stop();
    }
  }

}
