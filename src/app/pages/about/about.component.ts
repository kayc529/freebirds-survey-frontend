import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  title: string;

  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.data['title'];
  }

  ngOnInit(): void {}
}
