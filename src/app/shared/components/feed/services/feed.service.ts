import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import { environment } from '../../../../../environments/environment';
const apiUrl = environment.API_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = apiUrl + url;
    return this.http.get<GetFeedResponseInterface>(fullUrl);
  }
}
