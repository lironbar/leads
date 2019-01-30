import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from './campaign.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from '../commons/constants';

@Injectable()
export class CampaignService {
    private BASE_URL = Constants.BASE_URL;
    private _campaigns: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    public readonly campaigns: Observable<Campaign[]> = this._campaigns.asObservable();

    constructor(private http: HttpClient) {
    }

    getCampaigns() {
        const apiUrl = `${this.BASE_URL}/campaign`;
        return this.http.get<any>(apiUrl);
    }
    getCampaignsByAffiliateId(affiliateId: string, hasJoined) {
        const apiUrl = `${this.BASE_URL}/campaign`;
        let params = new HttpParams();
        params = params.append('affiliateId', affiliateId);
        params = params.append('joined', hasJoined);
        return this.http.get<any>(apiUrl, {params: params});
    }

    create(publisherId: string, campaign: Campaign) {
        campaign.publisherId = publisherId;
        const apiUrl = `${this.BASE_URL}/campaign`;
        return this.http.post<Campaign>(apiUrl, campaign);
    }

    delete(id: string) {
        const apiUrl = `${this.BASE_URL}/campaign/${id}`;
        return this.http.delete<Campaign>(apiUrl);
    }

}
