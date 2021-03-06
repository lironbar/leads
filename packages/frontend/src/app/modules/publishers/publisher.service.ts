import {BehaviorSubject, Observable} from 'rxjs';
import {Publisher} from './publisher.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from '../commons/constants';

@Injectable()
export class PublisherService {
    private BASE_URL = Constants.BASE_URL;
  // private apiRoot = 'http://localhost:8080';
  private _publishers: BehaviorSubject<Publisher[]> = new BehaviorSubject([]);
  public readonly publishers: Observable<Publisher[]> = this._publishers.asObservable();

  private _publisher: Observable<Publisher> = new Observable<Publisher>();

  constructor(private http: HttpClient) {}

  getAll(forceRefresh?: boolean) {
    // If the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!this._publishers.observers.length || forceRefresh) {
      // const fakeData = 'http://localhost:4200/assets/data/publishers.json';
      const apiUrl = `${this.BASE_URL}/publisher`;
      this.http.get<any>(apiUrl).subscribe(
        publishers => {
          this._publishers.next(publishers);
        },
        error => {
          this._publishers.error(error);
          // Recreate the Observable as after Error we cannot emit data anymore
          this._publishers = new BehaviorSubject([]);
        }
      );
    }
    return this.publishers;
  }

  getPublisherById(publisherId) {
    const apiUrl = `${this.BASE_URL}/publisher/${publisherId}`;
    return this.http.get<any>(apiUrl);
  }

  getPublisherCampaigns(publisherId) {
    const apiUrl = `${this.BASE_URL}/publisher/${publisherId}/campaigns`;
    return this.http.get<any>(apiUrl);
  }

  // createCampaignToPublisher(publisherId, campaign) {
  //   const apiUrl = `${this.BASE_URL}/publisher/${publisherId}/campaigns`;
  //   return this.http.post<Campaign>(apiUrl, campaign);
  // }

  create(publisher: Publisher) {
    this.http.post<Publisher>(`${this.BASE_URL}/publisher`, publisher)
      .subscribe(
        newPublisher => {
          const publishers = this._publishers.getValue();
          publishers.push(newPublisher);
          this._publishers.next(publishers);
        },
        error => {

        }
      );
  }

  update(id: string, publisher: Publisher): Observable<Publisher> {
      const apiUrl = `${this.BASE_URL}/publisher/${id}`;
      return this.http.put<Publisher>(apiUrl, publisher);
  }

  delete(id: string) {
    return this.http.delete<Publisher>(`${this.BASE_URL}/publisher/${id}`)
      .subscribe(
        deletedPublisher => {
          const publishers = this._publishers.getValue();
          const index = publishers.findIndex(function (publisher) {
            return publisher._id === id;
          });
          if (index !== -1) {
            publishers.splice(index, 1);
          }
          this._publishers.next(publishers);
        },
        error => {

        }
      );
  }

  handleError(action: string, error: any) {
    console.log('Error Catch!');
  }

}
