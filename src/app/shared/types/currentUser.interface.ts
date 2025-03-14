export interface CurrentUserInterface {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
