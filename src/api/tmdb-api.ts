import { GetMoviesOptions } from "../types/interfaces";

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
export const getMovies = async ({ filters = {}, sortBy = "popularity.desc", page = 1 }: GetMoviesOptions) => {
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

export const getUpcomingMovies = async ({ filters }: { filters: any }) => {
  let { startYear, endYear } = filters;

  // Swap startYear and endYear if startYear is later than endYear
  if (startYear && endYear && startYear > endYear) {
    [startYear, endYear] = [endYear, startYear];
  }

  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1&sort_by=primary_release_date.desc&with_original_language=en&vote_count.gte=1000`;

  if (startYear && endYear) {
    url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
  } else if (startYear) {
    url += `&primary_release_date.gte=${startYear}-01-01`;
  } else if (endYear) {
    url += `&primary_release_date.lte=${endYear}-12-31`;
  }

  if (filters.genre && filters.genre !== "0") {
    url += `&with_genres=${filters.genre}`;
  }

  console.log("Final API URL:", url);  // Debugging
  return fetchData(url);
};