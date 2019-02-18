import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Constants} from '../commons/constants';
import {Campaign} from '../campaigns/campaign.model';
import {Interface} from './interface.model';

@Injectable()
export class InterfaceService {
    private BASE_URL = Constants.BASE_URL;
    private apiUrl = `${this.BASE_URL}/interface`;
    constructor(
        private http: HttpClient
    ) {}

    public getAll() {
        return this.http.get<Interface[]>(this.apiUrl);
    }

    public getByCampaign(campaignId: string) {
        let params = new HttpParams();
        params = params.append('campaignId', campaignId);
        return this.http.get<Interface>(this.apiUrl, {params: params});
    }

    public create(payload) {
        return this.http.post<Interface>(this.apiUrl, payload);
    }

    public update(interfaceId, payload) {
        return this.http.put<Interface>(`${this.apiUrl}/${interfaceId}`, payload);
    }

    public delete(interfaceId: string) {
        return this.http.delete<Interface>(`${this.apiUrl}/${interfaceId}`);
    }
}