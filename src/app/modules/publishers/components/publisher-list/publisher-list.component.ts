import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PublisherService } from '../../publisher.service';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})

export class PublisherListComponent implements OnInit {
  publishers$: Observable<{}>;

  constructor(public publisherService: PublisherService) {}

  ngOnInit() {
    this.publishers$ = this.publisherService.getAll();
  }

  onDelete(id) {
    this.publisherService.delete(id);
  }

}
