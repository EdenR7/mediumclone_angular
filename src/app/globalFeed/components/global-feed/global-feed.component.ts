import { Component } from '@angular/core';
import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { PopularTagsComponent } from "../../../shared/components/popular-tags/popular-tags.component";

@Component({
  selector: 'app-global-feed',
  imports: [FeedComponent, BannerComponent, PopularTagsComponent],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {
  apiUrl = 'articles/';
}
