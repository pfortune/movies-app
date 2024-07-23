import React from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { MovieDetailsProps } from "../types/interfaces";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<string>();

  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id || ""),
    enabled: !!id, // Only fetch if id is truthy
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
