import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: "100vh",
    },
};

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({ movie, children }) => {
    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>({
        queryKey: ["images", movie.id],
        queryFn: () => getMovieImages(movie.id),
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }

    const images = data || [];

    return (
        <>
            <MovieHeader {...movie} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: MovieImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={"Movie image"}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;
