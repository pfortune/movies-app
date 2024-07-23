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
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getMovies = async () => {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1`;
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
