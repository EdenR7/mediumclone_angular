import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest, map } from 'rxjs';
import {
  selectError,
  selectFeedState,
  selectIsLoading,
} from './store/reducers';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { environment } from '../../../../environments/environment';
import queryString from 'query-string';

@Component({
  selector: 'app-feed',
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';
  public store = inject(Store);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedState),
  });
  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage = 0;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page']) || 1;
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    console.log(parsedUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset: offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
