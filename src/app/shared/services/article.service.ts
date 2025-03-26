import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ArticleInterface,
  ArticleResponseInterface,
} from '../types/article.interface';
const apiUrl = environment.API_BASE_URL;
const articleUrl = apiUrl + 'articles/';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = articleUrl + slug;
    return this.http
      .get<ArticleResponseInterface>(fullUrl)
      .pipe(map((res) => res.article));
  }
}
