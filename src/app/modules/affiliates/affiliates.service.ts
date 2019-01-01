import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Affiliate} from './affiliate.model';

@Injectable()
export class AffiliateService {
    private apiRoot = 'http://localhost:8080';
    private _affiliates: BehaviorSubject<Affiliate[]> = new BehaviorSubject([]);
    public readonly affiliates: Observable<Affiliate[]> = this._affiliates.asObservable();

    constructor(private http: HttpClient) {
    }

    getAll(forceRefresh?: boolean) {
        // If the Subject was NOT subscribed before OR if forceRefresh is requested
        if (!this._affiliates.observers.length || forceRefresh) {
            const fakeData = 'http://localhost:4200/assets/data/affiliates.json';
            const fakeEmptyData = 'http://localhost:4200/assets/data/affiliates_empty.json';
            const apiUrl = `${this.apiRoot}/affiliates`;
            this.http.get<any>(fakeEmptyData).subscribe(
                affiliates => {
                    this._affiliates.next(affiliates);
                },
                error => {
                    this._affiliates.error(error);
                    // Recreate the Observable as after Error we cannot emit data anymore
                    this._affiliates = new BehaviorSubject([]);
                }
            );
        }
        return this.affiliates;
    }

    getAffiliateById(affiliateId) {
        const fakeData = 'http://localhost:4200/assets/data/affiliate.json';
        const apiUrl = `${this.apiRoot}/affiliate/${affiliateId}`;
        return this.http.get<any>(fakeData);
    }

    getAffiliateCampaigns(affiliateId) {
        const fakeData = 'http://localhost:4200/assets/data/campaigns.json';
        const apiUrl = `${this.apiRoot}/affiliate/${affiliateId}/campaigns`;
        return this.http.get<any>(fakeData);
    }

    create(affiliate: Affiliate) {
        const apiUrl = `${this.apiRoot}/affiliate`;
        this.http.post<Affiliate>(apiUrl, affiliate).subscribe(
            newAffiliate => {
                const affiliates = this._affiliates.getValue();
                affiliates.push(newAffiliate);
                this._affiliates.next(affiliates);
            },
            error => {

            }
        );
    }

    delete(id: string) {
        const apiUrl = `${this.apiRoot}/affiliate/${id}`;
        return this.http.delete<Affiliate>(apiUrl).subscribe(
            deletedAffiliate => {
                const affiliates = this._affiliates.getValue().filter(function (a) {
                    return a._id !== id;
                });
                this._affiliates.next(affiliates);
            },
            error => {

            }
        );
    }

    handleError(action: string, error: any) {
        console.log('Error Catch!');
    }

}
