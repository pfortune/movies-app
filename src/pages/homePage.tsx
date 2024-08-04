import React from "react";
import PageTemplate from "../components/Templates/TemplateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/UI/Spinner";
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";

const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];

  return (
    <PageTemplate
      title="Latest Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => <AddToFavouritesIcon movie={movie} />}
    />
  );
};

export default HomePage;
