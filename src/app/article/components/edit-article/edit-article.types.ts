import { ArticleInterface } from '../../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErros.interface';

export interface editArticleStateInterface {
  article: ArticleInterface | null;
  isLoading: boolean;
  isSubmiting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
