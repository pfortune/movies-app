import React from "react";
import Header from "../Header/Movie/HeaderMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../Media/Movie/MovieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies, title, action }) => {
    return (
        <Grid container sx={styles.root}>
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <Grid item container spacing={1}>
                <MovieList
                    action={action}
                    movies={movies}
                ></MovieList>
            </Grid>
        </Grid>
    );
}
export default MovieListPageTemplate;