import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tagsActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectData, selectError, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  private store = inject(Store);
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    tags: this.store.select(selectData),
  });

  ngOnInit(): void {
    console.log('Tags');
    this.store.dispatch(tagsActions.getTags());
  }
}
