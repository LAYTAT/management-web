import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-digger-detail',
  templateUrl: './digger-detail.component.html',
  styleUrls: ['./digger-detail.component.css']
})
export class DiggerDetailComponent implements OnInit {
  carId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => this.carId = +params.get('id'));
  }
}
