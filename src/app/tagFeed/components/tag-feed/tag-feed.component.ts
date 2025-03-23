import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { FeedTogglerComponent } from '../../../shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { PopularTagsComponent } from '../../../shared/components/popular-tags/popular-tags.component';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-feed',
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    FeedTogglerComponent,
    FeedComponent,
    PopularTagsComponent,
  ],
  templateUrl: './tag-feed.component.html',
  styleUrl: './tag-feed.component.scss',
})
export class TagFeedComponent implements OnInit {
  apiUrl: string = '';
  tagName: string = '';

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // The component wont be destroyed when we will try to move between tags, thus its good to use subscription!
    this.route.params.subscribe((params: Params) => {
      console.log('chnage in tag feed params', params);
      this.tagName = params['slug'];
      this.apiUrl = `articles?tag=${this.tagName}`;
    });
  }
}
