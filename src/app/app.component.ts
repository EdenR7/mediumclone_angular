import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store/actions';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'mediumclone_angular';

  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
