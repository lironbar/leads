import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PublisherService } from '../../publisher.service';

@Component({
  selector: 'app-publishers-table',
  templateUrl: './publishers-table.component.html',
  styleUrls: ['./publishers-table.component.css']
})

export class PublishersTableComponent implements OnInit {
  publishers$: Observable<{}>;
  displayedColumns: string[] = ['index', 'name', 'phone', 'address', 'campaigns'];

  constructor(public publisherService: PublisherService) {}

  ngOnInit() {
    this.publishers$ = this.publisherService.getAll();
  }
}
