import {Injectable} from '@angular/core';
import {Constants} from '../../commons/constants';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Lead} from '../leads.model';

@Injectable({
    providedIn: 'root'
})
export class LeadService {
    private BASE_URL = Constants.BASE_URL;
    private apiUrl = `${this.BASE_URL}/leads`;

    constructor(private http: HttpClient) {}


    submit(campaignId: string, lead: Lead) {
        return this.http.post(`${this.apiUrl}/${campaignId}`, lead)
    }

    getLeadsByCampaign(campaignId: string) {
        return this.http.get<any>(`${this.apiUrl}/${campaignId}`);
    }
}