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
import { useTheme, Theme } from "@mui/material/styles";
import { FantasyMovieFormData } from "../../Forms/FantasyMovieForm";

interface FantasyMovieCardProps {
    movie: FantasyMovieFormData;
    action?: (m: FantasyMovieFormData) => React.ReactNode;
}

const styles = (theme: Theme) => ({
    card: {
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
    },
    media: {
        height: 500,
        borderRadius: 0,
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    infoText: {
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        marginBottom: theme.spacing(1),
    },
    description: {
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.primary,
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
    chip: {
        marginLeft: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    button: {
        margin: theme.spacing(1),
    },
    actions: {
        justifyContent: 'center',
        paddingBottom: theme.spacing(2),
    },
});

const FantasyMovieCard: React.FC<FantasyMovieCardProps> = ({ movie, action }) => {
    const theme = useTheme();
    const classes = styles(theme);

    return (
        <Card sx={classes.card}>
            <CardHeader
                avatar={
                    movie.oscar_winner ? (
                        <Avatar sx={classes.avatar}>
                            <EmojiEventsIcon />
                        </Avatar>
                    ) : null
                }
                title={
                    <Typography variant="h6" component="p" sx={classes.title}>
                        {movie.title || "Untitled Movie"}
                    </Typography>
                }
            />
            <CardMedia
                sx={classes.media}
                image={movie.poster ? movie.poster : img}
            />
            <CardContent sx={classes.content}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        {movie.release_date && (
                            <Typography variant="body2" component="p" sx={classes.infoText}>
                                <CalendarIcon fontSize="small" style={{ marginRight: '4px' }} />
                                {new Date(movie.release_date).toLocaleDateString()}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        {movie.genre_name && (
                            <Chip label={movie.genre_name} sx={classes.chip} />
                        )}
                    </Grid>
                    {movie.director && (
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p" sx={classes.infoText}>
                                <strong>Directed by:</strong> {movie.director}
                            </Typography>
                        </Grid>
                    )}
                    {movie.production_company && (
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p" sx={classes.infoText}>
                                <strong>Production:</strong> {movie.production_company}
                            </Typography>
                        </Grid>
                    )}
                    {movie.description && (
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p" sx={classes.description}>
                                {movie.description.length > 100
                                    ? movie.description.substring(0, 100) + '...'
                                    : movie.description}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
            <CardActions sx={classes.actions}>
                {action && action(movie)}
                <Link to={`/fantasy-movie/${movie.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" size="small" color="primary" sx={classes.button}>
                        More Info
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default FantasyMovieCard;
