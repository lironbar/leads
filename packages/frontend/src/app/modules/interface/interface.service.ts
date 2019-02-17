import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../commons/constants';
import {Campaign} from '../campaigns/campaign.model';

@Injectable()
export class InterfaceService {
    private BASE_URL = Constants.BASE_URL;
    private apiUrl = `${this.BASE_URL}/interface`;
    constructor(private http: HttpClient) {}

    create(campaignId, payload) {
        return this.http.post<Campaign>(this.apiUrl, payload);
    }
}