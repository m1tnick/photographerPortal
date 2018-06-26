import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from '../../../models/album';

@Component({
  selector: 'app-manage-albuns',
  templateUrl: './manage-albuns.component.html',
  styleUrls: ['./manage-albuns.component.css']
})
export class ManageAlbunsComponent implements OnInit {
  album: Album;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((
      (data) => { this.album = data.albuns;}
    ));
  }
}
