export interface IReview {
  id: string;
  title: string;
  description: string;
  rating: number;
  create_date: Date;
  movie_id: string;
  user_id: string;
}
