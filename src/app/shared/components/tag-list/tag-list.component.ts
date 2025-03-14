import { Component, Input } from '@angular/core';
import {
  PopularTagInterface,
  TagsStateInterface,
} from '../popular-tags/tags.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-list',
  imports: [CommonModule],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  @Input() tagList: PopularTagInterface[] = [];
}
