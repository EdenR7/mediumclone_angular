import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ArticleInterface,
  ArticleResponseInterface,
  createArticleReqInterface,
} from '../shared/types/article.interface';
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

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = articleUrl + slug;
    return this.http.delete(fullUrl);
  }

  createArticle(
    article: createArticleReqInterface
  ): Observable<ArticleInterface> {
    const fullUrl = articleUrl;
    return this.http
      .post<ArticleResponseInterface>(fullUrl, article)
      .pipe(map((response) => response.article));
  }

  editArticle(
    article: createArticleReqInterface,
    slug: string
  ): Observable<ArticleInterface> {
    const fullUrl = articleUrl + slug;
    return this.http
      .put<ArticleResponseInterface>(fullUrl, article)
      .pipe(map((response) => response.article));
  }
}
