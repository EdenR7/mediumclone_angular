import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { FeedTogglerComponent } from '../../../shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { PopularTagsComponent } from '../../../shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'app-your-feed',
  imports: [
    BannerComponent,
    FeedTogglerComponent,
    FeedComponent,
    PopularTagsComponent,
  ],
  templateUrl: './your-feed.component.html',
  styleUrl: './your-feed.component.scss',
})
export class YourFeedComponent {
  apiUrl = 'articles/feed';
}
