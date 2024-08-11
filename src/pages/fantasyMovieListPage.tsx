import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { MediaContext } from "../contexts/mediaContext";
import FantasyMovieCard from "../components/Media/FantasyMovie/FantasyMovieCard";
import Spinner from "../components/UI/Spinner";
import FantasyMovieHeader from "../components/Header/FantasyMovieHeader";
import { FantasyMovieFormData } from "../components/Forms/FantasyMovieForm";

const FantasyMovieListPage: React.FC = () => {
    const { getFantasyMovies } = React.useContext(MediaContext);

    // Using React Query's useQuery hook to fetch fantasy movies
    const { data: movies, isLoading, error } = useQuery<FantasyMovieFormData[], Error>({
        queryKey: ["fantasyMovies"],
        queryFn: getFantasyMovies,
        staleTime: 60000,
        gcTime: 300000,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Typography color="error">Failed to load fantasy movies. Please try again.</Typography>;
    }

    return (
        <Box>
            <FantasyMovieHeader title="Your Fantasy Movies" showCreateLink />

            {movies && movies.length === 0 ? (
                <Typography variant="h6">You haven't created any fantasy movies yet.</Typography>
            ) : (
                <Grid container spacing={4}>
                    {movies?.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} key={movie.id}>
                            <FantasyMovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default FantasyMovieListPage;
