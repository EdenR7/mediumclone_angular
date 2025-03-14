import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  PopularTagInterface,
  PopularTagsInterface,
  PopularTagsResponseInterface,
} from '../tags.interface';
const apiUrl = environment.API_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<PopularTagInterface[]> {
    const fullUrl = apiUrl + 'tags/';
    return this.http
      .get<PopularTagsResponseInterface>(fullUrl)
      .pipe(map(({ tags }) => tags));
  }
}
