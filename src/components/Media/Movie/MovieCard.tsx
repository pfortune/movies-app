import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import img from "../../../images/film-poster-placeholder.png";
import { BaseMovieProps } from "../../../types/interfaces";
import { MediaContext } from "../../../contexts/mediaContext";
import { useTheme, Theme } from "@mui/material/styles";

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
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
  infoText: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
});

const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {
  const { favourites } = React.useContext(MediaContext);
  const theme = useTheme();
  const isFavourite = favourites.includes(movie.id);

  const classes = styles(theme);

  return (
    <Card sx={classes.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={classes.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" sx={classes.title}>
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={classes.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2" component="p" sx={classes.infoText}>
              <CalendarIcon fontSize="small" style={{ marginRight: '4px' }} />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="p" sx={classes.infoText}>
              <StarRateIcon fontSize="small" style={{ marginRight: '4px' }} />
              {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing style={{ justifyContent: 'center' }}> {/* Center the buttons */}
        {action(movie)}
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button variant="contained" size="small" color="primary" sx={classes.button}>
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;