import React from "react";
import PageTemplate from "../components/Templates/TemplateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/UI/Spinner";
import AddToFavouritesIcon from "../components/Media/CardIcons/AddToFavourites";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { getMovies } from "../api/tmdb-api";
import { MovieFilters } from "../types/interfaces";

const HomePage: React.FC = () => {
  const filters: MovieFilters = {
    genre: "28",
    startYear: "2022",
    endYear: "2024",
  };

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>({
    queryKey: ["discover", filters],
    queryFn: () => getMovies({ filters, sortBy: "popularity.desc", page: 1 }),
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
