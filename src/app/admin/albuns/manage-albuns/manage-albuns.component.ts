import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-albuns',
  templateUrl: './manage-albuns.component.html',
  styleUrls: ['./manage-albuns.component.css']
})
export class ManageAlbunsComponent implements OnInit {
  name: string;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
         this.name = params["name"]; 
         console.log(this.name);
      }
   );
  }

}
