export interface ArticleInterface {
  body: string;
  createdAt: Date;
  description: string;
  favourited: boolean;
  favouritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: Date;
  // Add author inteface
}
