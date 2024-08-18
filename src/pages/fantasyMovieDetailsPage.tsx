import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MediaContext } from "../contexts/mediaContext";
import FantasyMovieDetails from "../components/Media/FantasyMovie/FantasyMovieDetails";
import Spinner from "../components/UI/Spinner";
import { Typography, Box } from "@mui/material";
import FantasyMovieHeader from "../components/Header/FantasyMovieHeader";
import { FantasyMovieFormData } from "../components/Forms/FantasyMovieForm";

const FantasyMovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getFantasyMovieById } = useContext(MediaContext);
    const [movie, setMovie] = useState<FantasyMovieFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await getFantasyMovieById(parseInt(id || "0", 10));
            if (movieData) {
                setMovie(movieData);
            } else {
                setError("Could not fetch the fantasy movie.");
            }
            setLoading(false);
        };

        fetchMovie();
    }, [id, getFantasyMovieById]);

    if (loading) return <Spinner />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ mt: 4 }}>
            <FantasyMovieHeader title={movie?.title || "Fantasy Movie Details"} showCreateLink showListLink />
            {movie ? (
                <FantasyMovieDetails
                    movie={movie}
                    maxWidth={1200}
                    cardMediaHeight="auto"
                    layout="side"
                />
            ) : (
                <Typography>No movie details available.</Typography>
            )}
        </Box>
    );
};

export default FantasyMovieDetailPage;
