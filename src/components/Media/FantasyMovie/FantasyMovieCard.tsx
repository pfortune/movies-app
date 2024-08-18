import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import img from "../../../images/film-poster-placeholder.png";
import { useTheme } from "@mui/material/styles";
import { FantasyMovieFormData } from "../../Forms/FantasyMovieForm";

interface FantasyMovieCardProps {
    movie: any;
    action?: (m: FantasyMovieFormData) => React.ReactNode;
}

const transformMovieData = (movieFromDb: any): FantasyMovieFormData => {
    return {
        title: movieFromDb.title,
        description: movieFromDb.description,
        genreId: movieFromDb.genre_id,
        genreName: movieFromDb.genre_name,
        releaseDate: movieFromDb.release_date,
        runtime: movieFromDb.runtime,
        director: movieFromDb.director,
        cast: movieFromDb.cast_members || [],
        oscarWinner: movieFromDb.oscar_winner,
        poster: movieFromDb.poster,
        posterFile: null,
        productionCompany: movieFromDb.production_company,
    };
};

const FantasyMovieCard: React.FC<FantasyMovieCardProps> = ({ movie, action }) => {
    const theme = useTheme();
    const transformedMovie = transformMovieData(movie);

    return (
        <Card
            sx={{
                maxWidth: 345,
                boxShadow: theme.shadows[3],
                transition: "transform 0.3s, box-shadow 0.3s",
                '&:hover': {
                    transform: "scale(1.05)",
                    boxShadow: theme.shadows[6],
                },
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <CardHeader
                avatar={
                    transformedMovie.oscarWinner ? (
                        <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                            <EmojiEventsIcon />
                        </Avatar>
                    ) : null
                }
                title={
                    <Typography variant="h6" component="p">
                        {transformedMovie.title || "Untitled Movie"}
                    </Typography>
                }
            />
            <CardMedia
                sx={{ height: 500, borderRadius: 0 }}
                image={transformedMovie.poster ? transformedMovie.poster : img}
            />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        {transformedMovie.releaseDate && (
                            <Typography variant="body2" component="p" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginBottom: theme.spacing(1), color: theme.palette.text.secondary }}>
                                <CalendarIcon fontSize="small" style={{ marginRight: '4px' }} />
                                {new Date(transformedMovie.releaseDate).toLocaleDateString()}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        {transformedMovie.genreName && (
                            <Chip label={transformedMovie.genreName} sx={{ marginLeft: theme.spacing(1), fontWeight: theme.typography.fontWeightBold, backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }} />
                        )}
                    </Grid>
                    {transformedMovie.director && (
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p" sx={{ fontSize: theme.typography.body2.fontSize, color: theme.palette.text.secondary, display: 'flex', alignItems: 'center', justifyContent: 'left', marginBottom: theme.spacing(1) }}>
                                <strong>Directed by:</strong> {transformedMovie.director}
                            </Typography>
                        </Grid>
                    )}
                    {transformedMovie.productionCompany && (
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p" sx={{ fontSize: theme.typography.body2.fontSize, color: theme.palette.text.secondary, display: 'flex', alignItems: 'center', justifyContent: 'left', marginBottom: theme.spacing(1) }}>
                                <strong>Production:</strong> {transformedMovie.productionCompany}
                            </Typography>
                        </Grid>
                    )}
                    {transformedMovie.description && (
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p" sx={{ fontSize: theme.typography.body2.fontSize, color: theme.palette.text.primary, textAlign: 'left', marginBottom: theme.spacing(2) }}>
                                {transformedMovie.description.length > 100
                                    ? transformedMovie.description.substring(0, 100) + '...'
                                    : transformedMovie.description}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingBottom: theme.spacing(2) }}>
                {action && action(transformedMovie)}
                <Link to={`/fantasy-movie/${transformedMovie.title}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" size="small" color="primary" sx={{ margin: theme.spacing(1) }}>
                        More Info
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default FantasyMovieCard;
