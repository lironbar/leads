import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from './campaign.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CampaignService {
  private apiRoot = 'http://localhost:8080';
  private _campaigns: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
  public readonly campaigns: Observable<Campaign[]> = this._campaigns.asObservable();

  constructor(private http: HttpClient) {}

  getCampaigns(forceRefresh?: boolean) {
    // If the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!this._campaigns.observers.length || forceRefresh) {
      const apiUrl = `${this.apiRoot}/campaign`;
      this.http.get<any>(apiUrl).subscribe(
        campaigns => {
          this._campaigns.next(campaigns);
        },
        error => {
          this._campaigns.error(error);
          // Recreate the Observable as after Error we cannot emit data anymore
          this._campaigns = new BehaviorSubject([]);
        }
      );
    }
    return this._campaigns.asObservable();
  }

  create(publisherId: string, campaign: Campaign) {
    campaign.publisherId = publisherId;
    return this.http.post<Campaign>(`${this.apiRoot}/campaign`, campaign);
  }

  delete(id: string) {
    return this.http.delete<Campaign>(`${this.apiRoot}/campaign/${id}`);
  }

}
