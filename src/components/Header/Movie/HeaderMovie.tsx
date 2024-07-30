import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { MovieDetailsProps } from "../../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontWeight: 500,
  },
  tagline: {
    fontStyle: "italic",
    color: "#555",
    marginTop: "4px",
  },
  avatar: {
    backgroundColor: "#ff6347",
    marginRight: "16px",
  },
  iconLink: {
    marginLeft: "8px",
    textDecoration: "none",
    color: "#3f51b5",
    cursor: "pointer",
    "&:hover": {
      color: "#1a237e",
    },
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
    <Paper component="div" sx={styles.root} elevation={1}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isFavourite && (
          <Avatar sx={styles.avatar}>
            <FavoriteIcon />
          </Avatar>
        )}
        <Box sx={styles.titleContainer} ml={isFavourite ? 2 : 0}>
          <Box sx={styles.titleRow}>
            <Typography variant="h5" component="h3" sx={styles.title}>
              {title}
            </Typography>
            {homepage && (
              <IconButton
                component="a"
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                sx={styles.iconLink}
                size="large"
              >
                <HomeIcon fontSize="large" />
              </IconButton>
            )}
          </Box>
          {tagline && (
            <Typography variant="subtitle1" sx={styles.tagline}>
              {tagline}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default MovieHeader;
