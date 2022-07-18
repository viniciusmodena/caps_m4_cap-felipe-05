export interface IGenre {
  name: string;
}

export interface IGenreUpdate {
  name?: string;
}

export interface IGenre_Movie_Ids {
  movieId: string;
  genreList: string[];
}
