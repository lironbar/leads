import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Campaign} from '../../campaign.model';
import {CampaignService} from '../../campaign.service';


@Component({
  selector: 'app-campaigns-view',
  templateUrl: './campaigns-view.component.html',
  styleUrls: ['./campaigns-view.component.css']
})

export class CampaignsViewComponent implements OnInit {
  campaigns$: Observable<Campaign[]>;

  constructor(public campaignService: CampaignService) {}

  ngOnInit() {
    this.campaigns$ = this.campaignService.getCampaigns();
  }
}
