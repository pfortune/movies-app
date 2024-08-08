import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { FantasyMovieFormData } from "../../Forms/FantasyMovieForm";
import placeholderImg from "../../../images/film-poster-placeholder.png";

const FantasyMovieDetails: React.FC<{ movie: FantasyMovieFormData }> = ({ movie }) => {
    const runtime = movie.runtime ? parseInt(movie.runtime.toString(), 10) : 0;

    const hours: number = Math.floor(runtime / 60);
    const minutes: number = runtime % 60;

    const formattedRuntime = hours > 0
        ? `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} minute${minutes > 1 ? 's' : ''}` : ''}`
        : `${minutes} minute${minutes > 1 ? 's' : ''}`;

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="450"
                    image={movie.posterFile || placeholderImg}
                    alt={`${movie.title} poster`}
                    onError={(e) => (e.currentTarget.src = placeholderImg)}
                />
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        {movie.title}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Genre: {movie.genreName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Release Date: {movie.releaseDate}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Runtime: {formattedRuntime}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Directed by: {movie.director}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Production Company: {movie.productionCompany}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Cast: {movie.cast.join(", ")}
                    </Typography>
                    {movie.oscarWinner && (
                        <Typography variant="h6" gutterBottom color="secondary">
                            🌟 Oscar Winner!
                        </Typography>
                    )}
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {movie.description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FantasyMovieDetails;