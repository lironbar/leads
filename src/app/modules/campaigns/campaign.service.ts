import {Observable, ReplaySubject} from 'rxjs';
import { Campaign } from './campaign.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';

@Injectable()
export class CampaignService {
  private apiRoot = 'http://localhost:8080';
  private campaigns: Campaign[] = [];
  private dataCampaigns$ = new ReplaySubject(1);

  constructor(private http: HttpClient) { }

  getCampaigns(forceRefresh?: boolean) {
    // If the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!this.dataCampaigns$.observers.length || forceRefresh) {
        const fakeData = 'http://localhost:4200/assets/campaigns.json';
        const apiUrl = `${this.apiRoot}/campaign`;
      this.http.get<any>(apiUrl).subscribe(
        campaigns => {
          this.campaigns = campaigns;
          this.dataCampaigns$.next(campaigns);
        },
        error => {
          this.dataCampaigns$.error(error);
          // Recreate the Observable as after Error we cannot emit data anymore
          this.dataCampaigns$ = new ReplaySubject(1);
        }
      );
    }
    return this.dataCampaigns$.asObservable();
  }
  addCampaign (campaign: Campaign) {
    this.http.post<Campaign>(`${this.apiRoot}/campaign`, campaign)
      .subscribe(
        newCampaign => {
        this.campaigns.push(newCampaign);
        this.dataCampaigns$.next(this.campaigns);
        },
        error => {

        }
      );
  }
  deleteCampaign(id: string) {
    return this.http.delete<Campaign>(`${this.apiRoot}/campaign/${id}`)
      .subscribe(
        deletedCampaign => {
        const index = this.campaigns.findIndex(function(campaign) {
          return campaign._id === id;
        });
        if (index !== -1) {
          this.campaigns.splice(index, 1);
        }
        this.dataCampaigns$.next(this.campaigns);
        },
        error => {

        }
      );
  }

  handleError(action: string, error: any) {
    console.log('Error Catch!');
  }

}
