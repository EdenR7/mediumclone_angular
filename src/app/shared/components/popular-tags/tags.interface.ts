export type PopularTagInterface = string;

export interface PopularTagsInterface {
  tags: PopularTagInterface[];
}
export interface PopularTagsResponseInterface {
  tags: PopularTagInterface[];
}

export interface TagsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: PopularTagInterface[];
}
