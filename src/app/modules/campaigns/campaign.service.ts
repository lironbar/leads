import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from './campaign.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CampaignService {
    private apiRoot = 'http://localhost:8080';
    private _campaigns: BehaviorSubject<Campaign[]> = new BehaviorSubject([]);
    public readonly campaigns: Observable<Campaign[]> = this._campaigns.asObservable();

    constructor(private http: HttpClient) {
    }

    getCampaigns() {
        const apiUrl = `${this.apiRoot}/campaign`;
        return this.http.get<any>(apiUrl);
    }

    create(publisherId: string, campaign: Campaign) {
        campaign.publisherId = publisherId;
        const apiUrl = `${this.apiRoot}/campaign`;
        return this.http.post<Campaign>(apiUrl, campaign);
    }

    delete(id: string) {
        const apiUrl = `${this.apiRoot}/campaign/${id}`;
        return this.http.delete<Campaign>(apiUrl);
    }

}
