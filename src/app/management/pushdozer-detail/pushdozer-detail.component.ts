import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pushdozer-detail',
  templateUrl: './pushdozer-detail.component.html',
  styleUrls: ['./pushdozer-detail.component.css']
})
export class PushdozerDetailComponent implements OnInit {

  carId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => +params.get('id'));
  }
}
