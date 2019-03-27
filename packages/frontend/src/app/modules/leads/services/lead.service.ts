import {Injectable} from '@angular/core';
import {Constants} from '../../commons/constants';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Lead} from '../leads.model';
import {Campaign} from '../../campaigns/campaign.model';

@Injectable({
    providedIn: 'root'
})
export class LeadService {
    private BASE_URL = Constants.BASE_URL;
    private apiUrl = `${this.BASE_URL}/lead`;

    constructor(private http: HttpClient) {}

    getLeadsByAffiliates(affiliateIds) {
        let params = new HttpParams();
        params = params.append('affiliateIds', affiliateIds);
        return this.http.get<Lead[]>(this.apiUrl, {params: params});
    }

    getLeadsByPublishers(publisherIds) {
        let params = new HttpParams();
        params = params.append('publisherIds', publisherIds);
        return this.http.get<Lead[]>(this.apiUrl, {params: params});
    }

    public sendLead(campaignId: string, affiliateId: string, lead: any) {
        const path = `${this.apiUrl}/campaign/${campaignId}`;
        return this.http.post<Campaign>(path, {affiliateId: affiliateId, lead: lead});
    }

    public getLeadsByCampaign(campaignId: string, approved: string) {
        const path = `${this.apiUrl}/campaign/${campaignId}`;
        let params = new HttpParams();
        params = params.append('approved', approved);
        params = params.append('success', 'true');
        return this.http.get<Lead[]>(path, {params: params});
    }


    // submit(campaignId: string, lead: Lead) {
    //     return this.http.post(`${this.apiUrl}/${campaignId}`, lead)
    // }
    //
    // getLeadsByCampaign(campaignId: string) {
    //     return this.http.get<any>(`${this.apiUrl}/${campaignId}`);
    // }
}