import { Component, inject, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrentUserInterface } from '../../types/currentUser.interface';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  private store = inject(Store);
  data$: Observable<{ currentUser: CurrentUserInterface | null | undefined }> =
    combineLatest({
      currentUser: this.store.select(selectCurrentUser),
    });
}
