import { ReplaySubject } from 'rxjs';
import { Publisher } from './publisher.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PublisherService {
  private apiRoot = 'http://localhost:8080';
  private publishers: Publisher[] = [];
  private dataPublishers$ = new ReplaySubject(1);

  constructor(private http: HttpClient) { }

  getAll(forceRefresh?: boolean) {
    // If the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!this.dataPublishers$.observers.length || forceRefresh) {
        const fakeData = 'http://localhost:4200/assets/publishers.json';
        const apiUrl = `${this.apiRoot}/publisher`;
      this.http.get<any>(apiUrl).subscribe(
        publishers => {
          this.publishers = publishers;
          this.dataPublishers$.next(publishers);
        },
        error => {
          this.dataPublishers$.error(error);
          // Recreate the Observable as after Error we cannot emit data anymore
          this.dataPublishers$ = new ReplaySubject(1);
        }
      );
    }
    return this.dataPublishers$.asObservable();
  }
  create(publisher: Publisher) {
    this.http.post<Publisher>(`${this.apiRoot}/publisher`, publisher)
      .subscribe(
        newPublisher => {
        this.publishers.push(newPublisher);
        this.dataPublishers$.next(this.publishers);
        },
        error => {

        }
      );
  }
  delete(id: string) {
    return this.http.delete<Publisher>(`${this.apiRoot}/publisher/${id}`)
      .subscribe(
        deletedPublisher => {
        const index = this.publishers.findIndex(function(publisher) {
          return publisher._id === id;
        });
        if (index !== -1) {
          this.publishers.splice(index, 1);
        }
        this.dataPublishers$.next(this.publishers);
        },
        error => {

        }
      );
  }

  handleError(action: string, error: any) {
    console.log('Error Catch!');
  }

}
