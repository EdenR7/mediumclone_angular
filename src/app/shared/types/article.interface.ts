import { PopularTagInterface } from '../components/popular-tags/tags.interface';
import { ProfileInterface } from './profile.interface';

export interface ArticleInterface {
  body: string;
  createdAt: Date;
  description: string;
  favourited: boolean;
  favouritesCount: number;
  slug: string;
  tagList: PopularTagInterface[];
  title: string;
  updatedAt: Date;
  author: ProfileInterface;
}

export interface ArticleResponseInterface {
  article: ArticleInterface;
}

export interface ArticleStateInterface {
  isLoading: boolean;
  error: string | null;
  data: ArticleInterface | null;
}
