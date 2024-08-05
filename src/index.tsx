import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/Layout/SiteHeader';
import UpcomingMoviePage from "./pages/upcomingMoviesPage";
import MediaContextProvider from "./contexts/mediaContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularTVShowsPage from "./pages/popularTVShowsPage";
import Box from "@mui/material/Box";
import AuthContextProvider from "./contexts/authContextProvider";
import LoginPage from "./pages/loginPage";
import PrivateRoute from "./components/Layout/ProtectedRoute";
import PlaylistPage from "./pages/playlistPage";
import FantasyMoviePage from "./pages/fantasyMoviePage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import AiringTodayTVShowsPage from "./pages/airingTodayTVShowsPage";
import TopRatedTVShowsPage from "./pages/topRatedTVShowsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const drawerWidth = 240;

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
          <MediaContextProvider>
            <Box
              sx={{
                marginLeft: drawerOpen ? `${drawerWidth + 5}px` : 0,
                transition: (theme) =>
                  theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
              }}
            >
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />

                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviePage />} />
                <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />

                <Route path="/tv/popular" element={<PopularTVShowsPage />} />
                <Route path="/tv/top-rated" element={<TopRatedTVShowsPage />} />
                <Route path="/tv/airing-today" element={<AiringTodayTVShowsPage />} />

                {/* Protected Routes */}
                <Route
                  path="/movies/favourites"
                  element={<PrivateRoute element={<FavouriteMoviesPage />} />}
                />
                <Route
                  path="/reviews/form"
                  element={<PrivateRoute element={<AddMovieReviewPage />} />}
                />
                <Route
                  path="/reviews/:id"
                  element={<PrivateRoute element={<MovieReviewPage />} />}
                />
                <Route
                  path="/playlist"
                  element={<PrivateRoute element={<PlaylistPage />} />}
                />
                <Route
                  path="/fantasy-movie"
                  element={<PrivateRoute element={<FantasyMoviePage />} />}
                />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>

            </Box>
          </MediaContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
