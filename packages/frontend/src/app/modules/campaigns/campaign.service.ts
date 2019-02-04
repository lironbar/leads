import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from './campaign.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from '../commons/constants';

@Injectable()
export class CampaignService {
    private BASE_URL = Constants.BASE_URL;
    private apiUrl = `${this.BASE_URL}/campaign`;
    private _campaigns: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    public readonly campaigns: Observable<Campaign[]> = this._campaigns.asObservable();

    constructor(private http: HttpClient) {}

    getCampaigns() {
        const apiUrl = `${this.BASE_URL}/campaign`;
        return this.http.get<any>(this.apiUrl);
    }
    getUnassignedCampaigns(affiliateId: string) {
        const apiUrl = `${this.BASE_URL}/campaign/unassigned/${affiliateId}`;
        return this.http.get<any>(apiUrl);
    }

    create(publisherId: string, campaign: Campaign) {
        campaign.publisherId = publisherId;
        const apiUrl = `${this.BASE_URL}/campaign`;
        return this.http.post<Campaign>(apiUrl, campaign);
    }

    join(campaignId: string, affiliateId: string) {
        const path = `${this.apiUrl}/${campaignId}/join`;
        return this.http.post<Campaign>(path, {affiliateId: affiliateId});
    }

    delete(id: string) {
        const apiUrl = `${this.BASE_URL}/campaign/${id}`;
        return this.http.delete<Campaign>(apiUrl);
    }

}
