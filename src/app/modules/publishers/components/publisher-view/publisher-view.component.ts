import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Publisher} from '../../publisher.model';
import {PublisherService} from '../../publisher.service';
import { flatMap, map } from 'rxjs/operators';
import {Campaign} from '../../../campaigns/campaign.model';
import {CampaignService} from '../../../campaigns/campaign.service';


@Component({
  selector: 'app-publisher-view',
  templateUrl: './publisher-view.component.html',
  styleUrls: ['./publisher-view.component.css']
})

export class PublisherViewComponent implements OnInit {
  constructor(public publisherService: PublisherService,
              public campaignService: CampaignService,
              private route: ActivatedRoute) {}

  publisherId: string;
  publisher$: Observable<Publisher>;
  // campaigns$: Observable<Campaign[]>;
  campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.publisherId = params['id'];
      this.publisher$ = this.publisherService.getPublisherById(this.publisherId);
      this.publisherService.getPublisherCampaigns(this.publisherId)
        .subscribe(campaigns => this.campaigns$.next(campaigns));

      // this.campaigns$ = this.publisherService.getPublisherCampaigns(this.publisherId);
    });

    // this.campaigns$ = this.publisher$.pipe(
    //   map(publisher => publisher.campaigns)
    // );
  }

  onCreateCampaign(campaign: Campaign) {
    this.campaignService.create(this.publisherId, campaign)
      .subscribe(newCampaign => {
        const campaigns = this.campaigns$.getValue();
        campaigns.push(newCampaign);
        this.campaigns$.next(campaigns);
      });
  }

}
