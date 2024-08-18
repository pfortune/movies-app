import { GetMoviesOptions, DiscoverMovies } from "../types/interfaces";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Generic fetch function to handle API requests
const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Movie-related API functions
export const getMovies = async ({ filters = {}, sortBy = "popularity.desc", page = 1 }: GetMoviesOptions): Promise<DiscoverMovies> => {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=${sortBy}`;

  if (filters.title) {
    url += `&query=${filters.title}`;
  }

  if (filters.startYear) {
    url += `&primary_release_date.gte=${filters.startYear}-01-01`;
  }

  if (filters.endYear) {
    url += `&primary_release_date.lte=${filters.endYear}-12-31`;
  }

  if (filters.genre) {
    url += `&with_genres=${filters.genre}`;
  }

  if (filters.language) {
    url += `&with_original_language=${filters.language}`;
  }

  if (filters.voteAverageGte !== undefined) {
    url += `&vote_average.gte=${filters.voteAverageGte}`;
  }

  if (filters.voteAverageLte !== undefined) {
    url += `&vote_average.lte=${filters.voteAverageLte}`;
  }

  return fetchData(url);
};

export const getPopularMovies = async (page = 1): Promise<DiscoverMovies> => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchData(url);
};

export const getMovie = async (id: string) => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  return fetchData(url);
};

export const getGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const data = await fetchData(url);
  return data.genres;
};

export const getMovieImages = async (id: string | number) => {
  const url = `${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.posters;
};

export const getMovieReviews = async (id: string | number) => {
  const url = `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.results;
};

export const getUpcomingMovies = async () => {
  const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&include_adult=false&page=1`;
  const data = await fetchData(url);
  return data.results;
};

export const getNowPlayingMovies = async (page = 1): Promise<DiscoverMovies> => {
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
  return fetchData(url);
};

export const getTopRatedMovies = async (): Promise<DiscoverMovies> => {
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`;
  return fetchData(url);
};
