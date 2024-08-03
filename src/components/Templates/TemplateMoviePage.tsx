import React from "react";
import MovieHeader from "../Header/MovieHeader";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../UI/Spinner";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import Box from "@mui/material/Box";

const styles = {
    imageListRoot: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        overflow: "hidden",
    },
    imageListItem: {
        width: 250,
        height: 150,
        marginRight: "10px",
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

    const images = (data || []).slice(0, 5); // Limit to the first 5 images
    const imageUrls = images.map((image) => `https://image.tmdb.org/t/p/w500/${image.file_path}`);

    return (
        <>
            <MovieHeader {...movie} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={12}>
                    <Box sx={styles.imageListRoot}>
                        <ImageList cols={5}>
                            {images.map((image, index) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.imageListItem}
                                >
                                    <img
                                        src={imageUrls[index]}
                                        alt={"Movie image"}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;