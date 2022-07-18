export interface IReview {
  title?: string;
  description?: string;
  rating: number;
  movie_id: string;
  user_id: string;
}

export interface IReviewRequest {
  title?: string;
  description?: string;
  rating: number;
}
