import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Publisher } from '../../publisher.model';
import { PublisherService } from '../../publisher.service';

@Component({
  selector: 'app-publishers-view',
  templateUrl: './publishers-view.component.html',
  styleUrls: ['./publishers-view.component.css']
})

export class PublishersViewComponent implements OnInit {
  publishers$: Observable<Publisher[]>;

  constructor(public publisherService: PublisherService) {}

  ngOnInit() {
    this.publishers$ = this.publisherService.getAll();
  }
}
