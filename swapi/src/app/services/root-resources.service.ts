import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import {
  catchError,
  delay,
  Observable,
  throwError,
  retry,
  tap,
  forkJoin,
} from 'rxjs';
import { API } from '../data/api';
import { IPeople } from '../models/people';

@Injectable({
  providedIn: 'root',
})
export class RootResourcesService {
  resources: string[] = [];
  people: IPeople[] = [];

  constructor(private http: HttpClient) {}

  get(): Observable<string[]> {
    return this.http.get<string[]>(API.root).pipe(
      tap((resources) => (this.resources = Object.keys(resources)))
      // catchError(this.errorHandler.bind(this))
    );
  }

  getPeople(): void {
    let arrayRequests = [];

    for (let index = 1; index <= 6; index++) {
      const req = this.http
        .get(API.people + index)
        .pipe(tap((people) => this.people.push(people as IPeople)));

      arrayRequests.push(req);
    }

    forkJoin(arrayRequests).subscribe();
  }
}
