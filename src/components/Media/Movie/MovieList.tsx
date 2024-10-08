import React from "react";
import Movie from "./MovieCard";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../../../types/interfaces";

const MovieList: React.FC<BaseMovieListProps> = ({ movies, action }) => {
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Movie key={m.id} movie={m} action={action} />
    </Grid>
  ));
  return movieCards;
}

export default MovieList;