import { Component, inject, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../services/utils.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = environment.limit;
  @Input() url: string = '';
  @Input() currentPage: number = 1;

  public utilService = inject(UtilsService);
  pagesCount = 1;
  pages: number[] = [];

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pagesCount > 0 ? this.utilService.range(1, this.pagesCount) : [];
  }
}
