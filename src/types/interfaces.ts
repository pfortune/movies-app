import { User } from '@supabase/supabase-js';

// Base interface for common media properties
export interface BaseMediaProps {
  id: number;
  name: string;
  title: string;
  poster_path: string | null;
  overview: string;
}

// Movie-specific interfaces
export interface BaseMovieProps extends BaseMediaProps {
  title: string;
  budget: number;
  homepage?: string;
  imdb_id: string;
  original_language: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
  [key: string]: any;
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

// Review-related interfaces
export interface Review {
  id: string;
  content: string;
  author: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

// Genre data interface
export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

// Discover movies result
export interface DiscoverMovies {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

// Filter options
export type FilterOption = "title" | "genre" | "voteAverageGte" | "voteAverageLte" | "language" | "startYear" | "endYear";

// Movie filters
export interface MovieFilters {
  title?: string;
  genre?: string;
  startYear?: string;
  endYear?: string;
  language?: string;
  voteAverageGte?: number;
  voteAverageLte?: number;
}

export interface GetMoviesOptions {
  filters?: MovieFilters;
  sortBy?: string;
  page?: number;
}

// Auth context interface
export interface AuthContextInterface {
  token: string | null;
  user: User | null;
  loading: boolean;
  authenticate: () => Promise<void>;
  signout: () => Promise<void>;
}
