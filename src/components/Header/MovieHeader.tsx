import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MovieDetailsProps } from "../../types/interfaces";
import { MediaContext } from "../../contexts/mediaContext";

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
  const { favourites } = useContext(MediaContext);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const isFav = favourites.includes(id);
    setIsFavourite(isFav);
  }, [id, favourites]);

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
              <Tooltip title="Visit official website">
                <IconButton
                  component="a"
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={styles.iconLink}
                  size="large"
                >
                  <LanguageIcon fontSize="large" />
                </IconButton>
              </Tooltip>
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
