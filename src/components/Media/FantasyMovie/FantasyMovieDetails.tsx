import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import placeholderImg from "../../../images/film-poster-placeholder.png";

interface FantasyMovieDetailsProps {
    movie: any;
    maxWidth?: number;
    cardMediaHeight?: string;
    layout?: "side" | "stacked";
}

const FantasyMovieDetails: React.FC<FantasyMovieDetailsProps> = ({
    movie,
    maxWidth = 800,
    cardMediaHeight = "auto",
    layout = "side"
}) => {
    if (!movie) {
        return <Typography>No movie details available.</Typography>;
    }

    const runtime = typeof movie.runtime === 'number' ? movie.runtime : parseInt(movie.runtime as string, 10);
    const validRuntime = isNaN(runtime) ? 0 : runtime;

    const hours = Math.floor(validRuntime / 60);
    const minutes = validRuntime % 60;

    const formattedRuntime = hours > 0
        ? `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ' ' + minutes + ' minute' + (minutes > 1 ? 's' : '') : ''}`
        : `${minutes} minute${minutes !== 1 ? 's' : ''}`;

    return (
        <Box sx={{ maxWidth, mx: "auto", mt: 4 }}>
            <Card sx={{
                display: 'flex',
                flexDirection: layout === "side" ? 'row' : 'column',
                width: '100%'
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: layout === "side" ? 300 : '100%',
                        height: cardMediaHeight
                    }}
                    image={movie.poster || placeholderImg}
                    alt={`${movie.title} poster`}
                    onError={(e) => (e.currentTarget.src = placeholderImg)}
                />
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        {movie.title || ""}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Genre: {movie.genre_name || movie.genreName || "No genre available."}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Release Date: {movie.release_date || movie.releaseDate || "Unknown"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Runtime: {formattedRuntime || "Unknown"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Directed by: {movie.director || "Unknown"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Production Company: {movie.production_company || movie.productionCompany || "Unknown"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Cast: {Array.isArray(movie.cast_members) ? movie.cast_members.join(", ") : (Array.isArray(movie.cast) ? movie.cast.join(", ") : "No cast available.")}
                    </Typography>
                    {movie.oscar_winner && (
                        <Typography variant="h6" gutterBottom color="secondary">
                            🌟 Oscar Winner!
                        </Typography>
                    )}
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {movie.description || "No description available."}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FantasyMovieDetails;
