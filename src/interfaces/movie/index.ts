export interface IMovie {
  title: string;
  release_year: number;
  synopse: string;
  image_url: string;
}

export interface IMovieUpdate {
  title?: string;
  release_year?: number;
  synopse?: string;
  image_url?: string;
}
