import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "./MovieReviews";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const styles = {
        chipSet: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            listStyle: "none",
            padding: theme.spacing(2),
            margin: theme.spacing(1, 0),
        },
        chipLabel: {
            margin: theme.spacing(0.5),
        },
        fab: {
            position: "fixed",
            top: theme.spacing(8),
            right: theme.spacing(2),
            zIndex: theme.zIndex.drawer + 1,
            transition: "transform 0.3s",
            "&:hover": {
                transform: "scale(1.1)",
            },
        },
        drawer: {
            padding: theme.spacing(2),
        },
    };

    // Toggle drawer open or closed
    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <>
            <Typography variant="h4" component="h2" gutterBottom>
                {movie.title}
            </Typography>

            <Typography variant="h5" component="h3" gutterBottom>
                Overview
            </Typography>

            <Typography variant="body1" component="p" gutterBottom>
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                {movie.genres.length > 0 && (
                    <li>
                        <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                    </li>
                )}
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={styles.chipLabel} color="secondary" />
                    </li>
                ))}
            </Paper>

            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} sx={styles.chipLabel} />
                <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} sx={styles.chipLabel} />
                <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} sx={styles.chipLabel} />
                <Chip label={`Released: ${movie.release_date}`} sx={styles.chipLabel} />
            </Paper>

            <Fab
                color="secondary"
                variant="extended"
                onClick={toggleDrawer}
                sx={styles.fab}
            >
                <NavigationIcon sx={{ marginRight: theme.spacing(1) }} />
                Reviews
            </Fab>

            <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer}>
                <Box sx={styles.drawer}>
                    <MovieReviews {...movie} />
                </Box>
            </Drawer>
        </>
    );
};

export default MovieDetails;