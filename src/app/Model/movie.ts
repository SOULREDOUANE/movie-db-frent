export interface Movie {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title: string; // Use 'title' if it's a movie, or 'name' if it's a TV show
  original_language: string;
  original_title: string; // Use 'original_title' if it's a movie, or 'original_name' if it's a TV show
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  genre_ids: number[];
  popularity: number;
  release_date: string; // Use 'release_date' if it's a movie, or 'first_air_date' if it's a TV show
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[]; // Use 'origin_country' if it's a TV show
  first_air_date?: string; // Use 'first_air_date' if it's a TV show
  isFavorite:boolean;
}
