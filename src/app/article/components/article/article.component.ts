import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { ArticleStateInterface } from '../../../shared/types/article.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { articleActions } from '../../store/actions';
import {
  selectArticle,
  selectError,
  selectIsLoading,
} from '../../store/reducers';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { TagListComponent } from '../../../shared/components/tag-list/tag-list.component';

@Component({
  selector: 'app-article',
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  slug: string = '';
  data$: Observable<ArticleStateInterface & { isAuthor: boolean }>;
  isAuthor$: Observable<boolean>;
  constructor(private store: Store, private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.isAuthor$ = combineLatest({
      article: this.store.select(selectArticle),
      currentUser: this.store
        .select(selectCurrentUser)
        .pipe(
          filter(
            (currentUser): currentUser is CurrentUserInterface | null =>
              currentUser !== undefined
          )
        ),
    }).pipe(
      map(({ currentUser, article }) => {
        if (!currentUser || !article) {
          return false;
        }
        return currentUser.username === article.author.username;
      })
    );
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticle),
      isAuthor: this.isAuthor$,
    });
  }

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
