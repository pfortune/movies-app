import React from "react";
import PageTemplate from "../components/Templates/TemplateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/UI/Spinner";
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { getTopRatedMovies } from "../api/tmdb-api";

const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>({
    queryKey: ["topRated"],
    queryFn: () => getTopRatedMovies(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => <><AddToFavouritesIcon movie={movie} /></>}
    />
  );
};

export default HomePage;
