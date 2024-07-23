import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from "@mui/material/Avatar";
import { MovieDetailsProps } from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MovieHeader: React.FC<MovieDetailsProps> = ({ id, title, homepage, tagline }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    try {
      const favourites: MovieDetailsProps[] = JSON.parse(localStorage.getItem('favourites') || '[]');
      const isFav = favourites.some(fav => fav.id === id);
      setIsFavourite(isFav);
    } catch (error) {
      console.error("Error reading favourites from localStorage:", error);
      setIsFavourite(false);
    }
  }, [id]);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      {isFavourite && (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      )}
      <Typography variant="h4" component="h3">
        {title}{"   "}
        {homepage && (
          <a href={homepage}>
            <HomeIcon color="primary" fontSize="large" />
          </a>
        )}
        <br />
        <span>{tagline}</span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
